import * as React from "react";
import { TodoItemInterface } from "../inteface";

const ToDoItem = (props: TodoItemInterface) => {
  return (
    <div className="todo-item">
      <div onClick={() => props.handleTodoComplete(props.todo.id)}>
        {props.todo.isCompleted ? (
          <span className="todo-item-checked">✔</span>
        ) : (
          <span className="todo-item-unchecked" />
        )}
      </div>
      <div className="todo-item-input-wrapper">
        <input
          value={props.todo.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.handleTodoUpdate(event, props.todo.id)
          }
        />
      </div>
      <button className="button button1" onClick={() => props.handleTodoRemove(props.todo.id)}>Delete</button>
    </div>
  );
};
export default ToDoItem;
