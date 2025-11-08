# 🚀 Quick Start Guide - AquaTrade Platform

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- VS Code or any code editor

## Step 1: Backend Setup

### Navigate to backend directory
```powershell
cd "project\back-end"
```

### Install dependencies
```powershell
npm install
```

### Start the server
```powershell
npm run dev
```

✅ Backend should be running on **http://localhost:3000**

You should see:
```
✅ MongoDB connected successfully to Atlas cluster
🚀 Server running on port 3000
🌐 API available at http://localhost:3000
```

## Step 2: Frontend Setup

### Open a NEW terminal and navigate to frontend
```powershell
cd "project\frontend"
```

### Install dependencies
```powershell
npm install
```

### Start React app
```powershell
npm start
```

✅ Frontend should be running on **http://localhost:3001**

## Step 3: Test the Application

### Open your browser and visit:
- **Frontend**: http://localhost:3001
- **API Health Check**: http://localhost:3000/health

### Test Authentication Flow:
1. Go to http://localhost:3001
2. Click "Register" to create a new account
3. Fill in email and password
4. Click "Login" after registration
5. After successful login, you'll be redirected to Main Page

### Main Page Features:
- **Explore Fish** - Browse fish catalog
- **Explore Shops** - Find local and global shops
- **Learn** - Educational content
- **Best Management** - Care guides and best practices

## 📝 API Testing with Postman/Thunder Client

### Register a User
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Get All Fish
```http
GET http://localhost:3000/api/fish
```

### Get All Shops
```http
GET http://localhost:3000/api/shops
```

### Get All BMP
```http
GET http://localhost:3000/api/bmp
```

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct in `back-end/src/config/database.js`
- Ensure port 3000 is not already in use
- Run `npm install` again

### Frontend won't start
- Ensure backend is running first
- Check if port 3001 is not already in use
- Run `npm install` again
- Clear cache: `npm cache clean --force`

### CORS errors
- Ensure backend server.js has correct CORS configuration
- Check that frontend is running on port 3001

### Database connection errors
- Verify MongoDB Atlas credentials
- Check internet connection
- Whitelist your IP address in MongoDB Atlas

## 📦 Project Structure

```
AquaTrade/
├── project/
│   ├── back-end/          # Node.js Express API
│   │   ├── server.js      # Main server file
│   │   ├── package.json   # Dependencies
│   │   └── src/
│   │       ├── config/    # Database & network config
│   │       ├── models/    # MongoDB schemas
│   │       └── routes/    # API endpoints
│   │
│   └── frontend/          # React Application
│       ├── package.json   # Dependencies
│       ├── public/        # Static files
│       └── src/
│           ├── App.js     # Main app & routing
│           ├── pages/     # Page components
│           ├── components/# Reusable components
│           ├── data/      # Sample data
│           └── styles/    # CSS files
```

## ✨ Available Routes

### Frontend Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/mainPage` - Main dashboard
- `/explore-fish` - Fish catalog
- `/explore-shops` - Shop listings
- `/best-management` - BMP guides
- `/profile` - User profile
- `/orders` - Order history

### Backend API Endpoints
- `/api/auth/*` - Authentication
- `/api/profile/*` - User profiles
- `/api/fish/*` - Fish management
- `/api/shops/*` - Shop management
- `/api/bmp/*` - Best practices

## 🎯 Next Steps

1. ✅ Both servers running
2. 📝 Test registration and login
3. 🐟 Add sample fish data
4. 🏪 Add sample shop data
5. 📚 Add BMP content
6. 🎨 Customize styling
7. 🔐 Add JWT authentication
8. 🖼️ Add images/videos

## 🔒 Security Note

⚠️ **IMPORTANT**: The current database credentials are exposed in the code. For production:
1. Create a `.env` file in the backend folder
2. Move all sensitive data to `.env`
3. Add `.env` to `.gitignore`
4. Never commit credentials to version control

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB connection is active
4. Check that both servers are running

---

**Happy Coding! 🚀**

Your AquaTrade platform is ready to explore the world of aquatic commerce!