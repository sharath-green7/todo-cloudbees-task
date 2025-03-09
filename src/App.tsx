import * as React from "react";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";
import { TodoInterface } from "./inteface";
import "./style.css";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const parsedTodos: TodoInterface[] = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        }
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (newTodo: TodoInterface) => {
    console.log("newTodo", newTodo.name);
    if(newTodo.name && newTodo.name.length > 0){
      const newTodosState = [...todos, newTodo];
      setTodos(newTodosState);
    }
  };

  function handleTodoUpdate(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const newTodosState: TodoInterface[] = [...todos];

    newTodosState.find((todo: TodoInterface) => todo.id === id)!.name = event.target.value;
    setTodos(newTodosState);
  }

  function handleTodoRemove(id: string) {
    const newTodosState: TodoInterface[] = todos.filter(
      (todo: TodoInterface) => todo.id !== id
    );
    setTodos(newTodosState);
  }

  function handleTodoComplete(id: string) {
    const newTodosState: TodoInterface[] = [...todos];
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted;
    setTodos(newTodosState);
  }
  return (
    <div className="App">
      <React.Fragment>
        <h2>My ToDo APP</h2>
        <ToDoForm todos={todos} handleTodoCreate={addTodo} />
        <ToDoList
          todos={todos}
          handleTodoUpdate={handleTodoUpdate}
          handleTodoRemove={handleTodoRemove}
          handleTodoComplete={handleTodoComplete}
        />
      </React.Fragment>
    </div>
  );
};
export default App;
