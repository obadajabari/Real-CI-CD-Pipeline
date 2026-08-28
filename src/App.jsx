import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const todos = [
    {
      id: 1,
      title: "Sample Task 1",
      completed: false,
    },
    {
      id: 2,
      title: "Sample Task 2",
      completed: true,
    },
  ];

  function deleteTodo() {}

  function toggleTodo() {}

  return (
    <div className="app">
      <div className="todo-container">
        <h1>Todo App - Tasks UI</h1>

        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      </div>
    </div>
  );
}

export default App;