# PassMan Demo

PassMan Demo is a password vault MVP with a React frontend and an Express + MongoDB backend. The app supports passwords, secure notes, search, seeded demo data, and route-backed modal flows for create and edit actions.

## Getting Started

Use Node `20.19.0` and npm `10.8.x`.

Install the root dependencies:

```bash
npm install
```

Install the frontend dependencies:

```bash
npm install --prefix frontend
```

Add your backend environment variables in `.env`:

```bash
MONGO_URI=...
```

You can also use the legacy `DB_USER` and `DB_PASS` pair if needed.

## Available Scripts

In the project root, you can run:

### `npm run dev`

Starts the backend and frontend together.

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: `http://localhost:5050`

### `npm run server`

Starts the backend with `nodemon`.

### `npm run client`

Starts the React frontend from the root workspace.

### `npm run verify`

Runs the frontend test pass and then builds the frontend bundle.

### `npm run build:frontend`

Builds the frontend for production into `frontend/build`.

## Demo Data

Import the smaller curated dataset:

```bash
npm run data:import:demo
```

Import the larger stress dataset:

```bash
npm run data:import:stress
```

Import the default dataset:

```bash
npm run data:import
```

Clear seeded data:

```bash
npm run data:destroy
```

## Frontend Scripts

If you need to work in the frontend directly, these scripts are available in `frontend/package.json`:

### `npm start --prefix frontend`

Runs the frontend in development mode.

### `npm test --prefix frontend`

Launches the frontend test runner.

### `npm run build --prefix frontend`

Builds the frontend bundle.

## Stack

- React 18
- React Router 6
- TanStack Query
- Tailwind CSS
- Headless UI
- Express
- MongoDB with Mongoose
- Algolia
- Faker
- zxcvbn
