import { Link } from "react-router";
import { Video } from "lucide-react";

import { getCountryInfo } from "../../../shared/get-country-info";
import type { Player } from "../../../core/data.type";

type PlayerCardProps = {
  player: Player;
};

export default function PlayerCard({ player }: PlayerCardProps) {
  const country = getCountryInfo(player.country);

  return (
    <article
      className={`bg-gray-900 rounded-2xl shadow-md text-white w-full max-w-sm mx-auto overflow-hidden flex flex-col ${
        !player.in_competition ? "grayscale cursor-not-allowed" : ""
      }`}
    >
      <header>
        <img
          src={`https://www.gravatar.com/avatar/${player.id}?s=400&d=identicon`}
          alt={`${player.name} ${player.last_name}`}
          className="w-full h-48 object-cover"
        />
      </header>

      <section className="flex flex-col items-start p-4 gap-1 flex-1">
        <h2 className="text-lg font-bold leading-tight">
          {player.name} {player.last_name}
        </h2>

        <p className="text-sm text-gray-400 hover:text-gray-300 -mt-2">
          <Link
            to={`/${player.id}`}
            target="_blank"
            className={
              !player.in_competition ? "pointer-events-none opacity-50" : ""
            }
          >
            {player.id}
          </Link>
        </p>
      </section>

      <footer className="px-4 py-3 flex items-center justify-between text-sm text-gray-300">
        <div>
          {country && (
            <span>
              {country.icon} {country.name}
            </span>
          )}
        </div>
        <a
          href={`https://youtube.com/watch?v=${player.video}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-cyan-400 font-medium transition duration-200 group ${
            !player.in_competition
              ? "pointer-events-none opacity-50"
              : "hover:text-cyan-300"
          }`}
        >
          <Video className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          <span>Ver video</span>
        </a>
      </footer>
    </article>
  );
}
