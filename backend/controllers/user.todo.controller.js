const Todo = require('../models/todoModel');



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



const paginated =  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
  
    try {
      const todosAggregate = await Todo.aggregate([
        { $match: { userId: req.user._id } },
        {
          $facet: {
            data: [{ $skip: skip }, { $limit: limit }],
            totalCount: [{ $count: "count" }]
          }
        }
      ]);
  
      const todos = todosAggregate[0].data;
      const total = todosAggregate[0].totalCount[0]?.count || 0;
  
      res.json({ todos, total });
    } catch (error) {
      res.status(500).json({ message: "Error fetching todos" });
    }
  };

module.exports = { addTodo, getTodo, updateTodo, deleteTodo , paginated };
