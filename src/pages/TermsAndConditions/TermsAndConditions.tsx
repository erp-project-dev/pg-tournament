export default function TermsAndConditions() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10 text-white space-y-6">
      <h1 className="text-3xl font-bold">Reglas del Torneo</h1>

      <p className="text-base text-gray-300 leading-relaxed">
        El torneo sigue una dinámica sencilla y está dividido en fases. En cada
        fase, los competidores se enfrentan en duelos directos dentro de grupos
        de batalla. Solo el ganador avanza a la siguiente etapa.
      </p>

      <div className="space-y-4 text-base text-gray-300 leading-relaxed">
        <h2 className="font-semibold text-lg text-white">¿Cómo funciona?</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Los participantes se inscriben enviando un video con su
            interpretación.
          </li>
          <li>
            Cada fase se divide en grupos de batalla con duelos uno contra uno.
          </li>
          <li>
            El jurado evalúa los duelos y determina al ganador de cada
            enfrentamiento.
          </li>
          <li>
            El ganador avanza a la siguiente fase; el perdedor queda eliminado.
          </li>
        </ol>
      </div>

      <div className="space-y-4 text-base text-gray-300 leading-relaxed">
        <h2 className="font-semibold text-lg text-white">
          Información importante
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Los puntajes otorgados por el jurado van del 0 al 5.</li>
          <li>
            Cada competidor podrá consultar su puntaje y estado en el ranking.
          </li>
          <li>
            Las fases están divididas por grupos, y cada grupo de batalla puede
            durar hasta una semana.
          </li>
          <li>
            La duración de cada grupo podría tomar entre 2 a 5 días hasta cerrar
            el grupo.
          </li>
          <li>
            La información del torneo se actualiza todos los días con nuevos
            resultados y avances.
          </li>
        </ul>
      </div>
    </section>
  );
}
