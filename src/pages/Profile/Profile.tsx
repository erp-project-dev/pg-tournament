import { useParams } from "react-router-dom";
import { FindPlayerProfileHandler } from "../../handlers/find-player-profile";
import ProfileHeader from "./components/ProfileHeader";
import ProfileProgress from "./components/ProfileProgress";
import ProfileBattleHistory from "./components/ProfileBattleHistory";

export default function Profile() {
  const { playerId } = useParams();
  const playerProfile = playerId
    ? FindPlayerProfileHandler.handle(playerId)
    : null;

  if (!playerId || !playerProfile) {
    return (
      <div className="text-center py-10 text-white">
        Participante no encontrado.
      </div>
    );
  }

  const { player, battles, playerSummary } = playerProfile;

  return (
    <section className="max-w-4xl mx-auto p-6 text-white">
      <div className="mb-8">
        <ProfileHeader key={player.id} player={player} />
      </div>

      <div className="mb-8">
        <ProfileProgress
          key={player.id}
          points={playerSummary.points}
          position={playerSummary.position}
          in_competition={player.in_competition}
        />
      </div>

      <div className="bg-black/60 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Historial de batallas</h3>
        {battles.length === 0 ? (
          <p className="text-gray-400">
            No ha participado en ninguna batalla aún.
          </p>
        ) : (
          <ProfileBattleHistory
            key={player.id}
            battles={battles}
            player={player}
          />
        )}
      </div>
    </section>
  );
}
