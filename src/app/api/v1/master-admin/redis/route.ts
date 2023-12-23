import { NextRequest, NextResponse } from "next/server";
import { SingletonRedisService } from "../../../../../data-services/redis-service";

export async function GET(request: NextRequest) {
    const redisClient = await SingletonRedisService.getInstance();
    const response = await redisClient.get('current');
    return NextResponse.json({
        response
    });
}

export async function POST(request: NextRequest) {
    const redisClient = await SingletonRedisService.getInstance();
    const response = await redisClient.set('current', Date.now().toLocaleString());
    return NextResponse.json(response);
}

// write a curl command to test this
// curl -X POST -d '{"query": "current"}' http://localhost:3000/api/v1/test/redis