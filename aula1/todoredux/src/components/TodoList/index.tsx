import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';
import { addTodo, toggleComplete, deleteTodo } from '../../redux/todo.slice';

const TodoList: React.FC = () => {

  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  
  const [newTask, setNewTask] = useState('');

  const handleOnClickAddTask = () => {
   dispatch(addTodo(newTask));
   setNewTask('');
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa..."
          style={{margin: "1rem",}}
        />
        <button onClick={handleOnClickAddTask}>Adicionar</button>
      </div>
      <ul style={{
         listStyle: "auto",
      }} >
        {todos.map((todo) => (
          <li key={todo.id} 
            style={{
               margin: "1rem",
               border: "0px solid red"
            }}
         >
            <span
              style={{
               textDecoration: todo.completed ? 'line-through' : 'none',
               textDecorationColor: todo.completed ?  "red" : "none",
               textDecorationThickness: todo.completed ?  "2px" : "none",
               textDecorationStyle:  todo.completed ?  "dotted" : "initial",
                marginRight: '2rem',
              }}
              onClick={() => dispatch(toggleComplete(todo.id))}
            >
              {todo.task}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
 
    </div>
  );
};

export default TodoList;
