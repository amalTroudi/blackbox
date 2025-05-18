
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Accueil", to: "/" },
  { name: "Partitions d'Équivalence", to: "/partitions" },
  { name: "Valeurs Limites (3 points)", to: "/bva-3points" },
  { name: "Valeurs Limites (2 points)", to: "/bva-2points" },
];

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <header className="bg-white/85 shadow py-2 sticky top-0 z-40 backdrop-blur">
      <nav className="container mx-auto flex flex-wrap justify-between items-center px-2 md:px-4">
        <div className="flex items-center space-x-2 text-xl font-bold text-gray-700">
          <span className="bg-gradient-to-br from-cyan-400 to-yellow-300 text-transparent bg-clip-text"></span>
          <span className="hidden sm:inline-block">Quiz Testing</span>
        </div>
        <div className="flex gap-2 md:gap-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link rounded px-2 py-1 transition 
                ${
                  pathname === link.to
                    ? "text-violet-700 font-bold underline underline-offset-4"
                    : "text-gray-600 hover:text-violet-700 hover:underline"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
