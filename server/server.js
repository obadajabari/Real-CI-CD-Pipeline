import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let todos = [];

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add todo
app.post("/api/todos", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const newTodo = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// Toggle todo
app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  todo.completed = !todo.completed;

  res.json(todo);
});

// Clear completed todos
app.delete("/api/todos/completed/all", (req, res) => {
  todos = todos.filter((todo) => !todo.completed);

  res.json({
    message: "Completed todos cleared",
  });
});

// Delete one todo
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const exists = todos.some((todo) => todo.id === id);

  if (!exists) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  todos = todos.filter((todo) => todo.id !== id);

  res.json({
    message: "Todo deleted",
  });
});

// Serve React production build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});