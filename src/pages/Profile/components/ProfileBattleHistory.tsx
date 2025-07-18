import { Link } from "react-router-dom";
import type { Player } from "../../../core/data.type";
import type { EnrichedPhaseBattle } from "../../../handlers/find-player-profile";

type Props = {
  player: Player;
  battles: EnrichedPhaseBattle[];
};

export default function ProfileBattleHistory({ player, battles }: Props) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b border-white/10 text-gray-400">
        <tr>
          <th className="py-2">Fase</th>
          <th className="py-2">Grupo</th>
          <th className="py-2">Contrincante</th>
          <th className="py-2 text-right">Tu puntaje</th>
          <th className="py-2 text-right">Puntaje rival</th>
          <th className="py-2 text-right">Resultado</th>
        </tr>
      </thead>
      <tbody>
        {battles.map((b) => {
          const won = b.winner_id === player.id;
          const opponent = won ? b.loser : b.winner;
          const playerScore = won ? b.winner_score : b.loser_score;
          const opponentScore = won ? b.loser_score : b.winner_score;

          return (
            <tr
              key={b.battle_id}
              className="border-b border-white/5 text-white"
            >
              <td className="py-2">{b.phase.name}</td>
              <td className="py-2">{b.group.name}</td>
              <td className="py-2">
                {opponent ? (
                  <Link
                    to={`/${opponent.id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {opponent.id}
                  </Link>
                ) : (
                  "-"
                )}
              </td>
              <td className="py-2 text-right">
                {playerScore?.toFixed(2) ?? "-"}
              </td>
              <td className="py-2 text-right">
                {opponentScore?.toFixed(2) ?? "-"}
              </td>
              <td
                className={`py-2 text-right ${
                  won ? "text-green-400" : "text-red-400"
                } font-semibold`}
              >
                {won ? "Victoria" : "Derrota"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
