function ClearCompleted({ clearCompleted }) {
  return (
    <button
      className="clear-button"
      onClick={clearCompleted}
    >
      Clear Completed
    </button>
  );
}

export default ClearCompleted;