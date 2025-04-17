require("./config/db");
const express=require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/user.route');
const todosRoutes=require('./routes/todo.route')
const authenticateToken = require('./middleware/authMiddleware');

const app=express();

app.use(cors({
    origin: 'http://localhost:4200', // Angular frontend
    credentials: true
  }));
app.use(bodyParser.json());

app.use('/auth',authRoutes);
app.use('/todo', authenticateToken ,todosRoutes);

const port=3000;

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})
