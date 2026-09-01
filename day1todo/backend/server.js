
const express=require('express');

const app= express()

const connectDB=require('./config/db.js');

app.listen(5000,()=>{
    console.log("server is listening on port 5000")
});
app.get("/",(req,res)=>{
    res.send("api is running....");
});
app.use(express.json());
app.use('/api/todos', require('./routes/todoroutes.js'));
connectDB();
