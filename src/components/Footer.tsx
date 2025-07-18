import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 py-10 px-6 text-gray-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8">
        <div>
          <h3 className="text-base font-semibold mb-3">Síguenos</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.instagram.com/peruguitar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@peruguitar105"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://open.spotify.com/show/7E8R0Pn41cC6EN4VjqFV3o?si=47cc6531493e4775"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                Spotify
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/erpprojectofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                ERP Project
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-3">Sobre nosotros</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-cyan-400 transition">
                Acerca de nosotros
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className="hover:text-cyan-400 transition"
              >
                Sobre el torneo
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-bold">&copy; {year} Perú Guitar</p>
          <p>Primera comunidad de guitarristas en el Perú desde el 2003.</p>
        </div>
      </div>
    </footer>
  );
}
