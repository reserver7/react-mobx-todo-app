import { observer } from 'mobx-react';
import React, { useState } from 'react'
import TodoStore from './TodoStore';

interface TodoListProps {
    todoStore: TodoStore;
}

const TodoList:React.FC<TodoListProps> = observer(({ todoStore }) => {
    const [value, setValue] = useState<string>('');

  return (
    <div>
        <div style={{marginBottom: 10}}>
            <input type="text" value={value} onChange={e => { setValue(e.target.value)}}/>
            <button onClick={() => {
                if(value) {
                    todoStore.addTodo(value);
                }
                setValue('');

                console.log(todoStore);
                
            }}>Submit</button>
        </div>

        <div>Completed: {todoStore.status.completed}</div>
        <div>remaining: {todoStore.status.remaining}</div>

        <ul>
            {todoStore.todos.map((todo) => {
                return (
                    <li key={todo.id} onClick={() => {
                        todoStore.toggleTodo(todo.id)
                    }}> {todo.title} [{todo.completed ? 'X' : ''}] </li>
                )
            })}
        </ul>
    </div>
  )
})

export default TodoList