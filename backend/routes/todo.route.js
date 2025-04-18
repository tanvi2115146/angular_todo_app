
const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todoModel');
const router = express.Router();

const {addTodo,getTodo,updateTodo,deleteTodo,paginated}=require('../controllers/user.todo.controller');







router.post('/add',addTodo);


router.get('/',getTodo);


router.put('/:id',updateTodo);


router.delete('/:id',deleteTodo );

router.get('/pagination',paginated)




module.exports = router;
