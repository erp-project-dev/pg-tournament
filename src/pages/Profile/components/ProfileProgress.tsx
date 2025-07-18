type Props = {
  points: number;
  position: number;
  in_competition: boolean;
};

export default function ProfileProgress({
  points,
  position,
  in_competition,
}: Props) {
  return (
    <div className="flex gap-4 text-white rounded-xl h-full">
      <div className="bg-black/60 flex-1 flex flex-col justify-center items-center p-6 rounded-xl">
        <div className="text-sm text-gray-400">Posición</div>
        <div className="text-3xl font-bold">#{position}</div>
      </div>

      <div className="bg-black/60 flex-1 flex flex-col justify-center items-center p-6 rounded-xl">
        <div className="text-sm text-gray-400">Puntaje</div>
        <div className="text-3xl font-bold">{points.toLocaleString()}</div>
      </div>

      <div className="bg-black/60 flex-1 flex flex-col justify-center items-center p-6 rounded-xl">
        <div className="text-sm text-gray-400">Estado</div>
        <div
          className={`mt-1 text-sm font-semibold ${
            in_competition ? "text-green-400" : "text-red-400"
          }`}
        >
          {in_competition ? "En competencia" : "Eliminado"}
        </div>
      </div>
    </div>
  );
}
