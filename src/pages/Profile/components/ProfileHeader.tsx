import type { Player } from "../../../core/data.type";
import { getCountryInfo } from "../../../shared/get-country-info";

type Props = {
  player: Player;
};

export default function ProfileHeader({ player }: Props) {
  const country = getCountryInfo(player.country);

  return (
    <div className="grid grid-cols-2 gap-8 rounded-xl py-10 px-8 text-white">
      <div className="flex justify-end items-center">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border border-white/20">
          <img
            src={`https://www.gravatar.com/avatar/${player.id}?s=400&d=identicon`}
            alt={`${player.name} ${player.last_name}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center text-left">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          {player.name} {player.last_name}
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl">{player.id}</p>

        {country && (
          <div className="flex items-center gap-3 text-base sm:text-lg text-gray-300 mt-2">
            <span>{country.icon}</span>
            <span>{country.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
