import React from "react";
import styled from "@emotion/styled";

import { TodoStatus, KanbanBoardProps } from "types/todo";
import TodoItem from "./TodoItem";

const BoardColumn = styled.div`
  min-width: 28rem;
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 0.5rem;
`;

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  todos,
  toggleComplete,
  deleteTodo,
  changeStatus,
}) => {
  const groupedTodos = {
    "To Do": todos.filter((todo) => todo.status === "To Do"),
    "In Progress": todos.filter((todo) => todo.status === "In Progress"),
    Completed: todos.filter((todo) => todo.status === "Completed"),
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {Object.keys(groupedTodos).map((status) => (
        <BoardColumn key={status}>
          <h2>{status}</h2>
          {groupedTodos[status as TodoStatus].map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              changeStatus={changeStatus}
            />
          ))}
        </BoardColumn>
      ))}
    </div>
  );
};

export default KanbanBoard;
