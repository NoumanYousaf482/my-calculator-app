function ConvertedDisplay({ value, currency }) {
  return (
    <div className="mb-4 p-4 bg-gray-900 text-pink-400 text-right text-3xl rounded-lg font-mono">
      {value} {currency}
    </div>
  );
}

export default ConvertedDisplay;