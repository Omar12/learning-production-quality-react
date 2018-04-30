import { addTodo } from "./todoHelpers";

test("addTodo should add the passed todo to the list", () => {
  const startTodos = [
    { id: 1, name: "One", isComplete: true },
    { id: 2, name: "Two", isComplete: false }
  ];
  const newTodo = { id: 3, name: "Three", isComplete: true };
  const expected = [
    { id: 1, name: "One", isComplete: true },
    { id: 2, name: "Two", isComplete: false },
    { id: 3, name: "Three", isComplete: true }
  ];

  const result = addTodo(startTodos, newTodo);

  expect(result).toEqual(expected);
});

test("addTodo should mutate the existing todo array", () => {
  const startTodos = [
    { id: 1, name: "One", isComplete: true },
    { id: 2, name: "Two", isComplete: false }
  ];
  const newTodo = { id: 3, name: "Three", isComplete: true };
  const expected = [
    { id: 1, name: "One", isComplete: true },
    { id: 2, name: "Two", isComplete: false },
    { id: 3, name: "Three", isComplete: true }
  ];

  const result = addTodo(startTodos, newTodo);

  expect(result).not.toBe(startTodos);
});
