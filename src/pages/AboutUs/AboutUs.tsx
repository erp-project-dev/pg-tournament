export default function AboutUs() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-8 text-white space-y-6">
      <h1 className="text-3xl font-bold">Acerca de Perú Guitar</h1>
      <p>
        <strong>Perú Guitar</strong> es una comunidad musical que nació en Perú
        con la misión de conectar, visibilizar y motivar a guitarristas de toda
        Latinoamérica. Nos impulsa la pasión por la guitarra y el deseo de crear
        un espacio donde los músicos compartan su arte, crezcan juntos y reciban
        reconocimiento por su trabajo.
      </p>

      <h2 className="text-2xl font-semibold">¿Qué buscamos?</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        <li>Inspirar a guitarristas de habla hispana a mostrar su talento.</li>
        <li>Fomentar una comunidad unida, participativa y con buena vibra.</li>
        <li>Dar visibilidad a músicos emergentes de la región.</li>
        <li>Celebrar la diversidad de estilos y enfoques musicales.</li>
      </ul>

      <h2 className="text-2xl font-semibold">Síguenos en redes</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        <li>
          Instagram:{" "}
          <a
            href="https://instagram.com/peruguitar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline hover:text-indigo-300 transition"
          >
            https://instagram.com/peruguitar
          </a>
        </li>
        <li>
          YouTube:{" "}
          <a
            href="https://youtube.com/@peruguitar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline hover:text-indigo-300 transition"
          >
            https://youtube.com/@peruguitar
          </a>
        </li>
      </ul>

      <p className="text-gray-400 text-sm">
        Para más información, síguenos en redes sociales o escríbenos por
        mensaje directo.
      </p>
    </section>
  );
}
