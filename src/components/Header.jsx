import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="text-center p-4 bg-gray-800 text-white dark:bg-gray-900">
      <nav className="flex justify-center space-x-6">
        <Link to="/" className="text-xl font-bold hover:text-pink-400">Calculator</Link>
        <Link to="/currency" className="text-xl font-bold hover:text-pink-400">Currency Converter</Link>
      </nav>
    </header>
  );
}

export default Header;