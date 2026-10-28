export default function Landing() {
  return (
    <main className="closed">
      <img className="closed-logo" src={`${import.meta.env.BASE_URL}logo-light.png`} alt="Peru Guitar" />
      <p className="closed-kicker">II Concurso de Solos de Guitarra</p>
      <h1>¡Nos vemos la próxima temporada!</h1>
      <p className="closed-text">
        El concurso terminó. Gracias a todos los guitarristas que participaron.
      </p>
      <a className="closed-link" href="https://www.instagram.com/peruguitar/" target="_blank" rel="noreferrer">
        Síguenos en Instagram @peruguitar
      </a>
    </main>
  );
}
