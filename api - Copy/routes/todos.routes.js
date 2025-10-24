const express = require('express');
const router = express.Router();
const todosController = require('../controller/todos.controller')

router.get('/', todosController.getAllTodos)

router.post('/', todosController.addTodo)


module.exports = router