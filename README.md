# Todo App - Full Stack MERN Application

A modern todo application built with React (frontend) and Node.js/Express (backend) with MongoDB database.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit todo titles and descriptions
- ✅ Responsive design
- ✅ RESTful API
- ✅ MongoDB database integration

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios for API calls
- CSS Modules for styling

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled
- bcrypt for password hashing

## Project Structure

```
todoapp/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── Routes/
│   │   ├── Views/
│   │   │   └── TODO/
│   │   └── Layout.js
│   ├── package.json
│   └── .env
├── server/                 # Node.js backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.js
│   │   └── todo.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── todo.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── todo.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── render.yaml            # Render deployment config
```

## Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=8000
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   REACT_APP_SERVER_URL=http://localhost:8000/api
   ```

4. Start the React app:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## API Endpoints

### Todo Routes
- `GET /api/todo` - Get all todos
- `POST /api/todo` - Create a new todo
- `PUT /api/todo/:id` - Update a todo
- `DELETE /api/todo/:id` - Delete a todo

### Auth Routes
- `POST /api/register` - Register a new user

## Deployment on Render

This application is configured for easy deployment on Render using the included `render.yaml` files.

### Option 1: Deploy Both Services Together

1. Connect your GitHub repository to Render
2. Use the root `render.yaml` file for automatic deployment of both frontend and backend
3. Set up your environment variables in the Render dashboard:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string

### Option 2: Deploy Services Separately

#### Backend Deployment
1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT` (automatically set by Render)

#### Frontend Deployment
1. Create a new Static Site on Render
2. Connect your repository
3. Set build command: `cd client && npm install && npm run build`
4. Set publish directory: `client/build`
5. Add environment variable:
   - `REACT_APP_SERVER_URL`: Your backend service URL

## Environment Variables

### Server (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todo
PORT=8000
JWT_SECRET=your_super_secret_jwt_key
```

### Client (.env)
```
REACT_APP_SERVER_URL=http://localhost:8000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
