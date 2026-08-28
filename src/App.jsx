import TodoForm from "./components/TodoForm";
import useTodos from "./hooks/useTodos";

function App() {
  const { addTodo } = useTodos();

  return (
    <div>
      <h1>Todo App - Logic Part</h1>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;