require('dotenv').config();
const express = require('express');
const connectMongoDB = require('./config/db');
const cors = require('cors');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

const { authenticate } = require('./middlewares/authMiddleware')
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;
//Establish DB connection
connectMongoDB();
// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://todoapp-es4w.onrender.com',
    'https://todoapp-84c9.onrender.com'
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
    //Routes
app.use('/api/todo', todoRoutes)
app.use('/api', authRoutes);
app.get("/", async(req, res) => {
    return res.status(200).json({ message: "Todo app server is up and running!" })
})
app.listen(PORT, () => {
    console.log(`Todo app server is listening on port ${PORT}`)
})
module.exports = app;