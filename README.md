# PassMan Demo

PassMan Demo is a design-focused password vault MVP with a React frontend and an Express + MongoDB backend. The app supports passwords, secure notes, search, seeded demo data, and route-backed modal flows for create and edit actions.

## Highlights

- Password and secure note vault with create, edit, delete, and search flows
- Comfortable dashboard cards for portfolio presentation and compact list views for scale
- Route-backed modals for add, edit, and destructive confirmation states
- Deterministic `demo` and `stress` seed modes for portfolio screenshots and scale testing
- Website logos powered by `logo.dev` when available, with graceful fallbacks
- Algolia-backed search with dedicated empty states for no-match queries

## Screenshots

### Comfortable Workspace

The dashboard is the presentation mode: larger cards, stronger hierarchy, and quick access to the core vault actions.

![Dashboard screenshot](docs/screenshots/dashboard.png)

### Password Vault

Passwords use branded logos, semantic actions, and clearer content hierarchy while still supporting denser collection views when the dataset grows.

![Password vault screenshot](docs/screenshots/passwords.png)

### Secure Notes

Notes follow the same system with larger reading surfaces, strong titles, and fast edit/delete actions.

![Secure notes screenshot](docs/screenshots/notes.png)

### Search At Scale

Search defaults to compact mode so larger result sets stay scannable. When a query returns no results, the UI falls back to dashed empty states instead of leaving large blank panels.

![Search screenshot](docs/screenshots/search.png)

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
