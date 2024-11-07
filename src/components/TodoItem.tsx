import React from "react";
import styled from "@emotion/styled";

import { TodoStatus, TodoItemProps } from "types/todo";

const ItemContainer = styled.div`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  width: 5rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border: 1px solid #222;
  margin-right: 0.25rem;
  border-radius: 0.5rem;
  background-color: #fff;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Title = styled.span<{
  completed: boolean;
  status: string;
}>`
  text-decoration: ${({ completed, status }) =>
    completed || status === "Completed" ? "line-through" : "none"};
  max-width: 5rem;
  word-wrap: break-word;
  display: inline-block;
`;

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo, changeStatus }) => {
  return (
    <ItemContainer>
      <Title completed={todo.completed} status={todo.status}>
        {todo.title}
      </Title>
      <select
        onChange={(e) => changeStatus(todo.id, e.target.value as TodoStatus)}
        value={todo.status}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <Row>
        <Button onClick={() => toggleComplete(todo.id)}>
          {todo.completed || todo.status === "Completed" ? "To Do" : "Complete"}
        </Button>
        <Button onClick={() => deleteTodo(todo.id)}>삭제</Button>
      </Row>
    </ItemContainer>
  );
};

export default TodoItem;
