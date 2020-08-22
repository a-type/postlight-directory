This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notes on choices

1. I opted for NextJS since it provides a great blueprint for both a high-quality React App and getting started quickly with serverless functions.
2. From there, I brought in Prisma 2 as an ORM. It's really easy to use and has an excellent development experience. I used SQLite as a simple, no-config database - not something I'd use in a production app.
3. After defining my database model using Prisma, I set up a basic GraphQL schema with relationships between Employees and Departments and basic pagination. I hooked this up to a serverless function in Next.
4. From there, I used Material-UI to build out a basic UI quickly. The UI is responsive using MUI's Grid. I like MUI since it does pretty well with accessibility out of the box and has great customization functionality.
5. After that - basic search filtering, adding a mutation to create a user, and whipping up a simple unit test suite for the submit form.

## What else I might do, in theory

1. I'd probably pull in Cypress to do some higher-level integration tests. Next apps can be tricky to test effectively on a unit level because of how specific the framework patterns are around SSR, but Cypress always works.
2. Other CRUD mutations - deleting, updating, etc.
3. A bit more visual polish certainly wouldn't hurt.

But, since I'd already spent about 8 hours, I decided to call it here.

## Running the app

### Setting up the backend

Run `npm run setup`. This will create a SQLite database, run migrations, and seed it. Then it will generate the Prisma client used in the backend. Answer "Yes" to any prompts and/or accept any default values. Seeding can take a while. If it fails, email me and I'll send a premade database file.

### Launching the UI

Now, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

`npm test` runs unit tests.
