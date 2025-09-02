import Button from './Button';

function Keypad({ handleNumber, handleOperator, handleEqual, handleClear, handleDecimal }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Button onClick={handleClear} isOperator span="col-span-2 bg-red-600 text-white">C</Button>
      <Button onClick={() => handleOperator('/')} isOperator>/</Button>
      <Button onClick={() => handleOperator('*')} isOperator>×</Button>
      {[7, 8, 9].map(num => (
        <Button key={num} onClick={() => handleNumber(String(num))}>{num}</Button>
      ))}
      <Button onClick={() => handleOperator('-')} isOperator>-</Button>
      {[4, 5, 6].map(num => (
        <Button key={num} onClick={() => handleNumber(String(num))}>{num}</Button>
      ))}
      <Button onClick={() => handleOperator('+')} isOperator>+</Button>
      {[1, 2, 3].map(num => (
        <Button key={num} onClick={() => handleNumber(String(num))}>{num}</Button>
      ))}
      <Button onClick={handleEqual} isOperator span="row-span-2 bg-pink-500 text-white">=</Button>
      <Button onClick={() => handleNumber('0')} span="col-span-2">0</Button>
      <Button onClick={handleDecimal}>.</Button>
    </div>
  );
}

export default Keypad;