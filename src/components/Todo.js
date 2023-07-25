import React, { useState } from "react";

export const Todo = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTodos((currentTodos) => {
      return [ ...currentTodos,
        {
          id: crypto.randomUUID(),
          item: value,
          completed: false
        },
      ]
    })
    setValue('')
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id, completed) => {
    setTodos(currentTodos => {
      return currentTodos.map((todo)=> {
        if(todo.id === id){
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="Form">
      <div className="Form-row">
        <label htmlFor="item"></label>
          <input
            id="item"
            type="text"
            value={value}
            placeholder="What needs to be done?"
            className="todo-input"
            onChange={(e) => setValue(e.target.value)}
          />
      
      <button className="todo-btn">
        Add Todo
      </button>
      </div>
    </form>

    <div className="List">
      {todos.map(todo=> {
        return (
          
          <div key={todo.id} className="items">
            <label>
              <input 
                type="checkbox"
                checked={todo.completed}
                onChange={e => toggleComplete(todo.id, e.target.checked)}
              />
              {todo.item}
            </label>
            <span className="delete" onClick={() => deleteTodo(todo.id)}>&#10060;</span>
            
          </div>
          
        )
      })}
    </div>
      <hr />
    <div className="foot">
      <span>{todos.length}: Item</span>
      <div className="foot-center">
        <span className="all">All</span>
        <span className="active">Active</span>
        <span className="completed">Completed</span>
      </div>
      <span className="clear">Clear Completed</span>
    </div>
   
  </>
  );
};
