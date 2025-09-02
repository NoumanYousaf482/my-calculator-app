function Button({ children, onClick, isOperator = false, span = '' }) {
  return (
    <button
      className={`p-4 rounded-full text-2xl font-bold ${
        isOperator ? 'bg-gray-800 text-pink-400' : 'bg-gray-700 text-white'
      } hover:bg-gray-600 focus:outline-none ${span}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;