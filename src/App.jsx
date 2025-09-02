import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Calculator from './components/Calculator';
import CurrencyConverter from './components/CurrencyConverter';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/currency" element={<CurrencyConverter />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;