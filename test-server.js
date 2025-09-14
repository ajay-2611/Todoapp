require('dotenv').config();
console.log('Testing server startup...');
console.log('Environment loaded');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ 
    origin: ['*', 'http://localhost:3000'], 
    credentials: true 
}));

app.get('/', (req, res) => res.json({ message: 'Server running!' }));
app.post('/api/register', (req, res) => res.json({ message: 'Registration endpoint working' }));

const PORT = 8000;
const server = app.listen(PORT, () => {
    console.log('Server started on port', PORT);
    console.log('Press Ctrl+C to stop');
});
