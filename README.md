# TASK-AND-PROJECT-MANAGEMENT-APPLICATION-APP

TaskFlow is a MERN project and task management app. The first build step provides a responsive dashboard preview and an Express/MongoDB API foundation.

## Project structure

- `client/` — React + Vite frontend
- `server/` — Express API, Mongoose models, and routes

## Run locally

Requires Node.js 20+ and a MongoDB database.

1. Install frontend dependencies with `cd client && npm install`.
2. Start the frontend with `npm run dev`.
3. In another terminal, install backend dependencies with `cd server && npm install`.
4. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` to a MongoDB database you control.
5. Start the API with `npm run dev`.

The frontend checks `VITE_API_URL` for the API base URL. It defaults to `http://localhost:5000`. The first dashboard uses clearly labeled sample figures while the database-backed project and task API is being built out.

## Deploy

### Vercel frontend

Import the GitHub repository as a Vercel project and set the **Root Directory** to `client`. Vercel should detect Vite; use `npm run build` and `dist` if prompted. Add `VITE_API_URL` with the public URL of the Render API (for example, `https://your-service.onrender.com`) and redeploy after setting it.

### Render backend

Create a **Web Service** from this GitHub repository and set **Root Directory** to `server`, **Build Command** to `npm install`, and **Start Command** to `npm start`. Add these environment variables in Render:

- `MONGODB_URI` — your MongoDB connection string
- `CLIENT_URL` — the deployed Vercel site origin (no trailing slash)
- `NODE_ENV` — `production`

Render provides `PORT` automatically. The API health check is `GET /api/health`; project and task collections are available at `/api/projects` and `/api/tasks`.
