import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToDoApp from "./App";

// Mock localStorage
beforeEach(() => {
  localStorage.clear();
  jest.spyOn(Storage.prototype, "setItem");
  jest.spyOn(Storage.prototype, "getItem");
});

test("adds a new todo and updates the list", async () => {
  render(<ToDoApp />);
  
  userEvent.type(screen.getByRole("textbox", { name: "" }), 'testTyping');
  const addButton = screen.getByRole("button", { name: "+ Add" });
  await userEvent.click(addButton);
  expect(screen.getByDisplayValue("testTyping")).toBeInTheDocument();
});

test("loads todos from localStorage on mount", async () => {
  render(<ToDoApp />);
  userEvent.type(screen.getByRole("textbox", { name: "" }), 'Saved Task');
  const addButton = screen.getByRole("button", { name: "+ Add" });
  await userEvent.click(addButton);
  expect(screen.getByDisplayValue("Saved Task")).toBeInTheDocument();
});
