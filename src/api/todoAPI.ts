import { Todo } from "../types/todo";

export const fetchTodos = async (limit = 5): Promise<Todo[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch todos");

  const data = await response.json();

  return data.map((todo: any) => ({
    ...todo,
    status: "To Do",
  }));
};
