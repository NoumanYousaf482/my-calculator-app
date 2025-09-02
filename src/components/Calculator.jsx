import { useState, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode as in image

  const handleNumber = (num) => {
    if (waitingForSecondOperand) {
      setDisplay(num);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op) => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
      setOperator(op);
      setWaitingForSecondOperand(true);
    } else if (operator) {
      const result = calculate(firstOperand, parseFloat(display), operator);
      setDisplay(String(result));
      setFirstOperand(result);
      setOperator(op);
      setWaitingForSecondOperand(true);
    }
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEqual = () => {
    if (firstOperand !== null && operator) {
      const result = calculate(firstOperand, parseFloat(display), operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/^\d$/.test(key)) {
        handleNumber(key);
      } else if (key === '.') {
        handleDecimal();
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
      } else if (key === 'Enter' || key === '=') {
        handleEqual();
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); // Cleanup
  }, [display, firstOperand, operator, waitingForSecondOperand]);

  return (
    <div className={`max-w-xs mx-auto p-6 rounded-3xl shadow-lg ${isDarkMode ? 'bg-gray-800 dark' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
            className="mr-2 w-4 h-4 text-pink-500 focus:ring-0"
          />
          Night mode 🌙
        </label>
      </div>
      <Display value={display} />
      <Keypad
        handleNumber={handleNumber}
        handleOperator={handleOperator}
        handleEqual={handleEqual}
        handleClear={handleClear}
        handleDecimal={handleDecimal}
      />
    </div>
  );
}

export default Calculator;