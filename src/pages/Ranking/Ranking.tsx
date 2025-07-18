import { Link } from "react-router-dom";
import { FindPlayerSummaryHandler } from "../../handlers/find-player-summary";
import { getCountryInfo } from "../../shared/get-country-info";
import Tooltip from "../../components/Tooltip/Tooltip";

export default function Ranking() {
  const records = FindPlayerSummaryHandler.handle();

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Ranking</h1>

      <div className="overflow-x-auto border border-white/20 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/10 text-gray-400">
            <tr>
              <th className="px-4 py-3 text-right">#</th>
              <th className="px-4 py-3 text-center">País</th>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3 text-right">Victorias</th>
              <th className="px-4 py-3 text-right">Puntos</th>
              <th className="px-4 py-3 text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => {
              const country = getCountryInfo(record.player.country);
              const isTop3 = index < 3;
              const isEliminated = !record.player.in_competition;

              return (
                <tr
                  key={record.player_id}
                  className={`bg-gray-900 border-t border-white/10 ${
                    isEliminated ? "grayscale" : ""
                  }`}
                >
                  <td
                    className={`px-4 py-4 text-right ${
                      isTop3 ? "font-bold" : ""
                    }`}
                  >
                    {record.position.toString().padStart(2, "0")}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Tooltip>
                      <Tooltip.Element>{country?.icon}</Tooltip.Element>
                      <Tooltip.Content>{country?.name}</Tooltip.Content>
                    </Tooltip>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <img
                      src={`https://www.gravatar.com/avatar/${record.player_id}?s=200&d=identicon`}
                      alt={record.player_id}
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to={`/${record.player_id}`}
                      className={`hover:underline ${isTop3 ? "font-bold" : ""}`}
                    >
                      {record.player_id}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-right">{record.victories}</td>
                  <td className="px-4 py-4 text-right">
                    {record.points.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="relative">
                      <Tooltip>
                        <Tooltip.Element>
                          <span
                            className={`inline-block rounded-full w-4 h-4 animate-pulse ${
                              record.player.in_competition
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                        </Tooltip.Element>
                        <Tooltip.Content>
                          {record.player.in_competition
                            ? "En competencia"
                            : "Eliminado"}
                        </Tooltip.Content>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
