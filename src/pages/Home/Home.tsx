import { useState } from "react";

import { FindPlayersHandler } from "../../handlers/find-players.handler";

import Select from "../../components/form/Select";
import PlayerCard from "./components/PlayerCard";

export default function Home() {
  const [players] = useState(FindPlayersHandler.handle());
  const [filter, setFilter] = useState<"-1" | "1" | "0">("-1");

  const filteredPlayers = players.filter((player) => {
    if (filter === "-1") return true;
    if (filter === "1") return player.in_competition === true;
    if (filter === "0") return player.in_competition === false;

    return true;
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Participantes</h1>

        <Select
          value={filter}
          onChange={(v) => setFilter(v as "-1" | "1" | "0")}
          options={[
            { value: "-1", label: "Ver todos los Participantes" },
            { value: "1", label: "En competencia" },
            { value: "0", label: "Fuera de competencia" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </section>
  );
}
