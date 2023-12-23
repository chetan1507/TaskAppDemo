import {createClient} from "redis";
import { promisify } from "util";

class RedisService {
  client;
  setAsync;
  getAsync;
  readyPromise;

  constructor() {
    // Retrieve Redis URL from environment variables
    const redisURL = process.env.REDIS_URL ?? "redis://localhost:6379";
    this.client = createClient({
      url: redisURL,
    });

    this.readyPromise = new Promise((resolve, reject) => {

      this.client.on("connect", () => {
        console.log("Connected to Redis");
        resolve(null);
      });

      this.client.on("error", (err) => {
        console.error(`Redis Error: ${err}`);
        reject(err);
      });

      this.client.connect();
    });

    // Promisify Redis commands for better async handling
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.getAsync = promisify(this.client.get).bind(this.client);
  }

  awaitReady() {
    return this.readyPromise;
  }

  // Set a key-value pair in Redis
  async set(key:string, value: string) {
    try {
      console.time("redis-set");
      await this.client.set(key, value);
      console.log(`Key ${key} set successfully`);
    } catch (err) {
      console.error(`Error setting key ${key}: ${err}`);
    } finally {
      console.timeEnd("redis-set");
    }
  }

  // Get the value for a given key from Redis
  async get(key: string) {
    try {
      console.time("redis-get");
      const reply = await this.client.get(key);
      console.log(`Value for key ${key}: ${reply}`);
      return reply;
    } catch (err) {
      console.error(`Error getting value for key ${key}: ${err}`);
    } finally {
      console.timeEnd("redis-get");
    }
  }

  // Close the Redis connection
  closeConnection() {
    this.client.quit();
    console.log("Redis connection closed");
  }
}

// Singleton pattern to ensure only one instance of RedisService
export class SingletonRedisService {
  static instance: RedisService;

  static async getInstance() {
    if (!this.instance) {
      this.instance = new RedisService();
      await this.instance.awaitReady();
    }
    return this.instance;
  }
}

// Example usage
// const redisService = SingletonRedisService.getInstance();
// redisService.setKeyValue("name", "John Doe");
// redisService.getValue("name");

// Use closeConnection when you're done with Redis
// redisService.closeConnection();
