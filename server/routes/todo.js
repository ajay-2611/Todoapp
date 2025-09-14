const express = require('express');
const { getAllTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Get all todos (protected)
router.get('/', authenticate, getAllTodos);

// Create a new todo (protected)
router.post('/', authenticate, createTodo);

// Update a todo (protected)
router.put('/:id', authenticate, updateTodo);

// Delete a todo (protected)
router.delete('/:id', authenticate, deleteTodo);

module.exports = router;