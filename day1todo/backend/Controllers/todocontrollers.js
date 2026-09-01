const Todo= require('../models/todomodels');

const getTodos = async (req,res)=>{
    try{
        const todos = await Todo.find();

        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
    
}
const createTodos = async (req,res)=> {
    try {
        if (!req.body.text){
            return res.status(400).json({message: 'Please add text'});
        }
        const todo = await Todo.create({
            text: req.body.text,
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateTodos= async(req,res)=>{
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.status(404).json({message: 'Todo not found'});
        }
        const updateTodo= await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        res.status(200).json(updateTodos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteTodos= async (req,res)=>{
    try {
        const todo= await Todo.findById(req.params.id);
         if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await todo.deleteOne();

        res.status(200).json({id: req.params.id});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = {
    getTodos, createTodos, updateTodos, deleteTodos
}