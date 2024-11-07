import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Todo, TodoStatus } from "types/todo";
import KanbanBoard from "components/KanbanBoard";
import { fetchTodos } from "api/todoAPI";

const AppContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem;
`;

const Input = styled.input`
  width: 40rem;
`;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const initialTodos = await fetchTodos();

        const updatedTodos: Todo[] = initialTodos.map((todo) => ({
          ...todo,
          status: todo.completed ? "Completed" : "To Do",
        }));

        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        setTodos(updatedTodos);
      } catch (error) {
        console.error("로드 실패", error);
      }
    };

    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const todos = JSON.parse(savedTodos);
      setTodos(todos);
    } else {
      loadTodos();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo,
        completed: false,
        status: "To Do",
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              status: !todo.completed ? "Completed" : "To Do", // Update status based on completion
            }
          : todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const changeStatus = (id: number, status: TodoStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: status === "Completed" ? true : false, status }
          : todo
      )
    );
  };

  return (
    <AppContainer>
      <h1>To-Do List</h1>
      <Input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="할 일 추가하기"
      />
      <button onClick={addTodo}>추가</button>
      <KanbanBoard
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        changeStatus={changeStatus}
      />
    </AppContainer>
  );
};

export default App;
