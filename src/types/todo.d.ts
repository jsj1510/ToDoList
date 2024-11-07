export type TodoStatus = "To Do" | "In Progress" | "Completed";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  status: TodoStatus;
}

export interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeStatus: (id: number, status: TodoStatus) => void;
}

export interface KanbanBoardProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeStatus: (id: number, status: TodoStatus) => void;
}
