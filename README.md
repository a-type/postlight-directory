This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Setting up the backend

Run `npm run setup`. This will create a SQLite database, run migrations, and seed it. Then it will generate the Prisma client used in the backend. Answer "Yes" to any prompts and/or accept any default values. Seeding can take a while. If it fails, email me and I'll send a premade database file.

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
