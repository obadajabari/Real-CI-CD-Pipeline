function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return (
    <div className="stats">
      <p>Total: {total}</p>
      <p>Active: {active}</p>
      <p>Completed: {completed}</p>
    </div>
  );
}

export default TodoStats;