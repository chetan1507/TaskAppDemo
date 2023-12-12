## Task App demo with Next.js + MongoDB

- Built with [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- Uses Tailwind for CSS customizations.
- Uses Mongo DB in the backend to store the tasks.
- Uses Next Auth with Google based authentication.

## Local dev setup guide
### 1. Checkout the code
```
git clone https://github.com/chetan1507/TaskAppDemo.git
```

### 2. Run a local MongoDB instance
You can follow the instructions on the following page to install MongoDB on your machine accordingly and run the same.
https://www.mongodb.com/docs/manual/administration/install-community/

### 3. Setup local env variables
Setup the following variables in `.env.local` file at root.
Configure them for prod in a similar way if you are deploying prod.
```
GOOGLE_CLIENT_ID=<google client id>
GOOGLE_CLIENT_SECRET=<google client secret>

NEXTAUTH_URL=http://localhost:3000/api/v1/auth
NEXTAUTH_SECRET=<auth secret>

MONGO_DB_URL=mongodb://127.0.0.1:27017/
```

#### Side notes
- Ensure that google client id and secret also have the required whitelisted url endpoints and callback endpoints.
```
https://<domain name>/api/auth/callback/google
```
- If you are using [https://cloud.mongodb.com/](https://cloud.mongodb.com/) for mongodb endpoint, you'll have to configure the same with user name and password and also ensure that the access is not restricted by IP if you are deploying to Vercel like platforms.

### 4. Run the dev server

```bash
npm ci
npm run dev
# or
pnpm ci
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app home screen.

## Production
The demo app is also deployed on [https://task-demo-app.vercel.app/](https://task-demo-app.vercel.app/).
Do check it out.

## Author
Chetan Agrawal (<chetan1507@gmail.com>)
Feel free to drop a note or raise issues.