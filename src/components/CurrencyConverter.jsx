import { useState, useEffect } from 'react';
import AmountDisplay from './AmountDisplay';
import ConvertedDisplay from './ConvertedDisplay';
import CurrencySelect from './CurrencySelect';
import AmountKeypad from './AmountKeypad';

function CurrencyConverter() {
  const [amount, setAmount] = useState('0');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('0');
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data.result === 'success') {
          setRates(data.rates);
          setCurrencies(Object.keys(data.rates));
          setLoading(false);
        } else {
          setError('Failed to load rates');
          setLoading(false);
        }
      })
      .catch(err => {
        setError('Error fetching rates');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency] && amount && parseFloat(amount) > 0) {
      const conv = (parseFloat(amount) / rates[fromCurrency]) * rates[toCurrency];
      setConvertedAmount(conv.toFixed(2));
    } else {
      setConvertedAmount('0');
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleNumber = (num) => {
    setAmount(amount === '0' ? num : amount + num);
  };

  const handleDecimal = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.');
    }
  };

  const handleClear = () => {
    setAmount('0');
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) return <div className="text-white">Loading currencies...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

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
      <AmountDisplay value={amount} currency={fromCurrency} />
      <div className="flex justify-between mb-4">
        <CurrencySelect
          value={fromCurrency}
          onChange={setFromCurrency}
          currencies={currencies}
          label="From"
        />
        <button onClick={swapCurrencies} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600">
          ↔
        </button>
        <CurrencySelect
          value={toCurrency}
          onChange={setToCurrency}
          currencies={currencies}
          label="To"
        />
      </div>
      <ConvertedDisplay value={convertedAmount} currency={toCurrency} />
      <AmountKeypad
        handleNumber={handleNumber}
        handleDecimal={handleDecimal}
        handleClear={handleClear}
      />
    </div>
  );
}

export default CurrencyConverter;