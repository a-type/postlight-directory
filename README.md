This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Setting up the backend

Run `npm run db:up` to migrate the database. This will ask you if you want to create a new SQLite database, choose `Yes`.

Then, run `npm run prisma:generate` to generate the Prisma client used in the API.

Finally, seed the database using `npm run db:seed`. It can take a few minutes. If this doesn't work, send me an email and I can just send you a premade SQLite database file.

### Running the app

Now, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

`npm test` runs unit tests.
