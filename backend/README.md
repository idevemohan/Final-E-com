# Cozy Decor Backend

Node/Express + MongoDB API for auth and products.

## Setup

1. Create `.env` in `backend/` with:

```
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/cozydecor
JWT_SECRET=change_this_in_production
```

2. Install deps and run:

```
cd backend
npm i
npm run dev
```

API runs at `http://localhost:5000`.

## Routes

- POST `/api/auth/register` { email, password, name }
- POST `/api/auth/login` { email, password }
- GET `/api/products?q=&category=`
- POST `/api/products` { title, price, image, category, ... }


