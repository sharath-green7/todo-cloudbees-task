import * as React from "react";
import shortid from "shortid";
import { TodoInterface, TodoFormInterface } from "../inteface";
import { useRef, useState } from "react";
const ToDoForm = (props: TodoFormInterface) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState("");
  const [errText, setErrText] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(event.target.value);
  }

  function handleInputEnter(event: any) {
    setErrText(false);
    if (values && values.length > 0) {
      if (event.key === "Enter" || event === "button") {
        const newTodo: TodoInterface = {
          id: shortid.generate(),
          name: values,
          isCompleted: false,
        };
        props.handleTodoCreate(newTodo);
        if (inputRef && inputRef.current) {
          setValues("");
          inputRef.current.value = "";
        }
      }
    } else {
      setErrText(true);
    }
  }
  return (
    <div className="todo-form">
      <input
        className="custom-search-input"
        ref={inputRef}
        type="text"
        placeholder="Enter new todo"
        onChange={(event) => handleInputChange(event)}
        onKeyDown={(event) => handleInputEnter(event)}
      />
      
      <button
        className="button button1 absol-position"
        onClick={(event) => handleInputEnter("button")}
      >
        + Add
      </button>
      {errText && <span style={{ color: "red" }}>Please enter a valid text</span>}
    </div>
  );
};
export default ToDoForm;
