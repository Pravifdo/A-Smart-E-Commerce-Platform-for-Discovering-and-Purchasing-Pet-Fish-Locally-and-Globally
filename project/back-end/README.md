# AquaTrade Backend API

Backend server for the AquaTrade e-commerce platform for discovering and purchasing pet fish.

## Features

- User authentication (Register/Login)
- User profile management
- Fish catalog management
- Shop management
- Best Management Practices (BMP)
- Secure API with helmet and CORS
- Rate limiting
- MongoDB database

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Profile
- `GET /api/profile/:userId` - Get user profile
- `PUT /api/profile/:userId` - Update user profile

### Fish
- `GET /api/fish` - Get all fish
- `GET /api/fish/:id` - Get fish by ID
- `POST /api/fish` - Create new fish
- `PUT /api/fish/:id` - Update fish
- `DELETE /api/fish/:id` - Delete fish

### Shops
- `GET /api/shops` - Get all shops
- `GET /api/shops/:id` - Get shop by ID
- `POST /api/shops` - Create new shop
- `PUT /api/shops/:id` - Update shop
- `DELETE /api/shops/:id` - Delete shop

### Best Management Practices
- `GET /api/bmp` - Get all practices
- `GET /api/bmp/:id` - Get practice by ID
- `GET /api/bmp/topic/:topic` - Get practices by topic
- `POST /api/bmp` - Create new practice
- `PUT /api/bmp/:id` - Update practice
- `DELETE /api/bmp/:id` - Delete practice

## Database Models

- User
- UserProfile
- Fish
- Shop
- BMP (Best Management Practices)

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- bcrypt (password hashing)
- JWT (authentication)
- Helmet (security)
- CORS
- Express Rate Limit
