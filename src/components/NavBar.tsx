import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NavBar() {
  return (
    <nav className="border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-center space-x-8">
        <div className="flex space-x-6 text-sm font-medium text-gray-300">
          <Link to="/competition" className="hover:text-white transition">
            Competencia
          </Link>
          <Link to="/ranking" className="hover:text-white transition">
            Ranking
          </Link>
        </div>

        <div className="relative">
          <Link to="/">
            <div className="p-1 rounded-full border border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="Logo" className="h-18 w-18 object-contain" />
            </div>
          </Link>
        </div>

        <div className="flex space-x-6 text-sm font-medium text-gray-300">
          <Link
            to="/terms-and-conditions"
            className="hover:text-white transition"
          >
            Reglamento
          </Link>
          <Link to="/about-us" className="hover:text-white transition">
            Acerca de nosotros
          </Link>
        </div>
      </div>
    </nav>
  );
}
