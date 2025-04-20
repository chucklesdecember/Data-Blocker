# Data Blocker Backend

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the backend server:
   ```sh
   npm start
   ```
   The server will run at http://localhost:4000

## API Endpoints
- `POST /api/register` — Register a new user
- `POST /api/login` — Login user or admin
- `POST /api/analytics` — Log analytics event (auth required)
- `POST /api/quiz` — Log quiz results (auth required)
- `GET /api/admin/analytics` — Get all analytics (admin only)
- `GET /api/admin/quiz` — Get all quiz results (admin only)
- `GET /api/admin/export` — Export analytics to Excel (admin only)

## Database
- SQLite database file: `data-blocker.db`
- Tables: `users`, `analytics`, `quiz_results`
