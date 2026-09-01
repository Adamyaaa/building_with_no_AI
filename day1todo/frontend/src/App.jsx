import {useState, useEffect} from 'react'


import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos= async()=>{
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      
      setTodos(data);

    }
    catch (error){
      console.error("Error fetching data:", error);
    }
  }
  const [text, setText] = useState('');
  const addTodo = async (e) => {
    
    e.preventDefault(); 
    if (!text) return;

    try {
      const response= await fetch('/api/todos',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text:text}),
      });

      const newTodo = await response.json();

      setTodos([...todos, newTodo]);

      setText('');
    }
    catch(error){
      console.error("Error adding todo:",error);
    }
  }
    const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // We send the opposite of the current status
        body: JSON.stringify({ completed: !currentStatus }), 
      });

      const updatedTodo = await response.json();

      setTodos(
        todos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );

    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  useEffect(()=>{
  fetchTodos();
},[]);


  return (
     <div>
      <h1>My Todo App</h1>
      
      {}
      <form onSubmit={addTodo}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Add a new task..." 
        />
        <button type="submit">Add Task</button>
      </form>
            <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <span onClick={() => toggleComplete(todo._id, todo.completed)}>
              {todo.text} - {todo.completed ? "Done" : "Not Done"}
            </span>
            <button 
              onClick={() => deleteTodo(todo._id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {}
    </div>
  )
}



export default App
