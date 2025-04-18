const Todo = require('../models/todoModel');
const mongoose = require('mongoose');




const addTodo = async (req, res) => {
    const { taskTitle, priority, status } = req.body;
    try {
        const newTodo = new Todo({
            userId: req.user._id,
            taskTitle,
            priority,
            status
        });
        await newTodo.save();
        res.json({ message: "Todo created successfully", todo: newTodo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user._id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo updated', todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const deleteTodo = async (req, res) => {
    try {
        const result = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!result) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: "Todo deleted successfully", result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const paginated = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || '';
  
      const matchStage = {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user._id),
          taskTitle: { $regex: search, $options: 'i' } // case-insensitive search
        }
      };
  
      const todos = await Todo.aggregate([
        matchStage,
        { $skip: (page - 1) * limit },
        { $limit: limit }
      ]);
  
      const totalTodos = await Todo.countDocuments({
        userId: req.user._id,
        taskTitle: { $regex: search, $options: 'i' }
      });
  
      const totalPages = Math.ceil(totalTodos / limit);
  
      return res.status(200).json({
        todos,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.error('Pagination error:', error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
  
  
  
  

module.exports = { addTodo, getTodo, updateTodo, deleteTodo , paginated };
