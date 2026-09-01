const { text } = require('express');
const mongoose=require('mongoose');

const todoschema= mongoose.Schema(
    {
        text: {
            type:String,
            required:true,
        },
        completed: {
            type:Boolean,
            default:false,
        }
        
    },
    {
        timestamp: true
    }
);

module.exports = mongoose.model('Todo',todoschema);