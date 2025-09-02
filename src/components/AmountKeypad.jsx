import Button from './Button';

function AmountKeypad({ handleNumber, handleDecimal, handleClear }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[7, 8, 9].map(num => (
        <Button key={num} onClick={() => handleNumber(String(num))}>{num}</Button>
      ))}
      {[4, 5, 6].map(num => (
        <Button key={num} onClick={() => handleNumber(String(num))}>{num}</Button>
      ))}
      {[1, 2, 3].map(num => (
        <Button key={num} onClick={() => handleNumber(String(num))}>{num}</Button>
      ))}
      <Button onClick={() => handleNumber('0')} span="col-span-1">0</Button>
      <Button onClick={handleDecimal}>.</Button>
      <Button onClick={handleClear} isOperator span="bg-red-600 text-white">C</Button>
    </div>
  );
}

export default AmountKeypad;