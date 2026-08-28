import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo, toggleTodo }) {
  if (todos.length === 0) {
    return <p className="empty-message">No tasks here.</p>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;