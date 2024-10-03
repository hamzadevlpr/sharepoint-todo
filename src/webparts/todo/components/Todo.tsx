import * as React from 'react';
import './todo.css'; // Import the plain CSS file
import { useState } from 'react';
import classNames from 'classnames';
import { ITodoProps } from './ITodoProps';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const TodoApp: React.FC<ITodoProps> = (props) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const todo: TodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: number, title: string) => {
    setEditingTodoId(id);
    setEditingTodoTitle(title);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setEditingTodoTitle('');
  };

  const saveEdit = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editingTodoTitle } : todo
      )
    );
    setEditingTodoId(null);
    setEditingTodoTitle('');
  };

  return (
    <div className="todoApp">
      <div className="container">
        <h1>Todo App</h1>
        <div className="inputWrapper">
          <input
            type="text"
            value={newTodo}
            onChange={(e: any) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editingTodoId === todo.id ? (
                <div className="editWrapper">
                  <input
                    type="text"
                    value={editingTodoTitle}
                    onChange={(e: any) => setEditingTodoTitle(e.target.value)}
                  />
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                  <button className="cancel" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    onClick={() => toggleTodo(todo.id)}
                    className={classNames({ completed: todo.completed })}
                  >
                    {todo.title}
                  </span>
                  <button onClick={() => startEditing(todo.id, todo.title)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
