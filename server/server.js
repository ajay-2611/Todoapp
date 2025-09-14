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
//Cors
app.use(cors({
        origin: [
            "*", "http://localhost:3000"
        ],
        credentials: true
    }))
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