import { Video } from "lucide-react";
import type { Player } from "../../../../../core/data.type";
import { getCountryInfo } from "../../../../../shared/get-country-info";

type Direction = "left" | "right";

type ParticipantBlockProps = {
  player: Player;
  direction?: Direction;
  winnerId?: string;
  winnerScore?: number;
  loserScore?: number;
};

export default function ParticipantBlock({
  player,
  direction = "left",
  winnerId,
  winnerScore,
  loserScore,
}: ParticipantBlockProps) {
  const isLeft = direction === "left";
  const isWinner = winnerId && player.id === winnerId;
  const isLoser = winnerId && player.id !== winnerId;

  const alignment = isLeft
    ? "sm:items-start sm:text-left items-center text-center"
    : "sm:items-end sm:text-right items-center text-center";

  const layout = isLeft
    ? "sm:flex-row flex-col"
    : "sm:flex-row-reverse flex-col";

  const blockClass = [
    "flex flex-col gap-3 w-full sm:w-1/2 overflow-hidden rounded-lg p-4 transition-all duration-300",
    alignment,
    isLoser ? "grayscale opacity-50" : "",
  ].join(" ");

  const country = getCountryInfo(player.country);

  const score =
    isWinner && winnerScore !== undefined
      ? winnerScore
      : isLoser && loserScore !== undefined
      ? loserScore
      : undefined;

  return (
    <div className={blockClass}>
      <div className={`flex items-center gap-4 w-full ${layout} min-w-0`}>
        <img
          src={`https://www.gravatar.com/avatar/demo?s=200&d=identicon`}
          alt={`${player.name} ${player.last_name}`}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="flex flex-col min-w-0">
          <div
            className={`font-semibold text-base truncate ${
              isWinner ? "text-green-400" : "text-white"
            }`}
            title={`${player.name} ${player.last_name}`}
          >
            {player.name} {player.last_name}
          </div>

          <span className="text-xs text-gray-400 truncate" title={player.id}>
            {player.id}
          </span>

          {country && (
            <span className="text-sm mt-1">
              {country.icon} {country.name}
            </span>
          )}
        </div>
      </div>

      <div
        className={`flex justify-between items-center mt-4 text-sm w-full ${
          score !== undefined
            ? isLeft
              ? "flex-row-reverse"
              : "flex-row"
            : isLeft
            ? "flex-row"
            : "flex-row-reverse"
        }`}
      >
        <a
          href={`https://youtube.com/watch?v=${player.video}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-cyan-400 hover:underline hover:text-cyan-300 transition"
        >
          <Video className="w-4 h-4" />
          Ver video
        </a>

        {score !== undefined && (
          <div className={`text-left ${isLeft ? "text-left" : "text-right"}`}>
            <div className="text-xs text-gray-400 uppercase tracking-wide -mb-1">
              Score
            </div>
            <div
              className={`text-xl font-bold ${
                isWinner ? "text-green-400" : "text-gray-300"
              }`}
            >
              {score.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
