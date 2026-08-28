import { useEffect, useState } from "react";

function useTodos() {
  const [todos, setTodos] = useState([]);

  // Load todos from backend
  useEffect(() => {
    async function loadTodos() {
      try {
        const response = await fetch("/api/todos");

        if (!response.ok) {
          throw new Error("Failed to load todos");
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadTodos();
  }, []);

  // Add todo
  async function addTodo(title) {
    if (!title.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await response.json();

      setTodos((prevTodos) => [
        ...prevTodos,
        newTodo,
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  // Delete todo
  async function deleteTodo(id) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  // Complete / uncomplete todo
  async function toggleTodo(id) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  // Delete completed todos
  async function clearCompleted() {
    try {
      const response = await fetch("/api/todos/completed/all", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear completed todos");
      }

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => !todo.completed)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
  };
}

export default useTodos;