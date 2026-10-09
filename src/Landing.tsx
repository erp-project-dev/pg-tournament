import { useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  AudioWaveform,
  CalendarClock,
  CalendarX2,
  Check,
  Copy,
  Crosshair,
  Gavel,
  Instagram,
  LoaderCircle,
  MapPin,
  Music,
  Pause,
  Play,
  Repeat,
  RotateCcw,
  RotateCw,
  Send,
  SlidersVertical,
  Smartphone,
  TrendingUp,
  Volume1,
  Volume2,
  VolumeX,
  Wallet,
} from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/peruguitar/";
// End of Oct 20 in Lima (UTC-5).
const DEADLINE = new Date("2026-10-21T04:59:59Z").getTime();
const HASHTAG = "#PeruGuitarConcurso2";
const BASE = import.meta.env.BASE_URL;
const TRACK_URL = `${BASE}audio/backing-track-dm.wav`;
// Saved under this exact name; the served file keeps a URL-safe one.
const TRACK_FILENAME = "Peru Guitar - Concurso #2 Backing Track Dm.wav";
const TRACK_META = "WAV · 19 MB";

const STEPS = [
  {
    icon: ArrowDownToLine,
    title: "Descarga la pista",
    body: (
      <>
        Baja el backing track oficial del concurso.{" "}
        <a className="inline-link" href={TRACK_URL} download={TRACK_FILENAME}>
          Descargar la pista
        </a>
      </>
    ),
  },
  {
    icon: Smartphone,
    title: "Graba en vertical",
    body: "Formato Reel, con tu rostro y tus manos a la vista durante todo el solo.",
  },
  {
    icon: SlidersVertical,
    title: "Cuida el audio",
    body: "Nítido, sincronizado con la pista y sin saturar. Recomendamos grabar con interfaz de audio.",
  },
  {
    icon: Send,
    title: "Publica tu Reel",
    body: (
      <>
        Desde una cuenta pública de Instagram, etiquetando a{" "}
        <a className="inline-link" href={INSTAGRAM_URL} target="_blank" rel="noopener">
          @peruguitar
        </a>{" "}
        y con el texto de abajo.
      </>
    ),
  },
];

const CRITERIA = [
  { icon: Crosshair, title: "Técnica", body: "Precisión, afinación y limpieza." },
  { icon: AudioWaveform, title: "Sonido", body: "Claridad y balance en la mezcla." },
  { icon: Music, title: "Lenguaje", body: "Fraseo musical y originalidad." },
  { icon: TrendingUp, title: "Estructura", body: "Desarrollo, clímax y cierre del solo." },
];

const STAGES = [
  { icon: CalendarClock, title: "Participaciones", body: "Se aceptan videos hasta el 20 de octubre." },
  { icon: Gavel, title: "Jurado", body: "El jurado califica cada video, uno por uno, y anunciará la fecha de resultados." },
];

const TERMS = [
  { icon: CalendarX2, term: "Fecha límite", body: "20 de octubre, hasta las 23:59 (hora de Lima)." },
  { icon: MapPin, term: "Quién participa", body: "Residentes en Perú o personas con cuenta activa de Yape o Plin." },
  { icon: Wallet, term: "Premios", body: "Se pagan en soles (PEN) vía Yape o Plin." },
];

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, DEADLINE - now);
  return {
    closed: ms === 0,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1_000) % 60),
  };
}

type CountdownState = ReturnType<typeof useCountdown>;

function Countdown({ closed, days, hours, minutes, seconds }: CountdownState) {
  if (closed) {
    return (
      <div className="countdown is-closed">
        <Gavel aria-hidden="true" />
        Participaciones cerradas. El jurado está calificando.
      </div>
    );
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="countdown" role="timer" aria-label={`Faltan ${days} días, ${hours} horas y ${minutes} minutos`}>
      <span className="countdown-label">
        <small>Cierra el</small>
        <b>20 oct</b>
      </span>
      <span className="countdown-cells" aria-hidden="true">
        <span><b>{pad(days)}</b>días</span>
        <span><b>{pad(hours)}</b>horas</span>
        <span><b>{pad(minutes)}</b>min</span>
        <span><b>{pad(seconds)}</b>seg</span>
      </span>
    </div>
  );
}

function formatTime(t: number) {
  const s = Math.max(0, Math.floor(t));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// RMS loudness of the track in 96 slices (0–z), precomputed from the WAV.
const WAVEFORM = "echfffdjjiigiihijfffiihjihhghjhhllpiogfqmpklnppmnlqrplonjpolpppmorokojosrqxlzyusprsyyusgb8542200";
const BARS = Array.from(WAVEFORM, (c) => 0.16 + 0.84 * (parseInt(c, 36) / 35) ** 1.6);
const SEEK_STEP = 5;

function TrackPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const wave = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "playing" | "paused">("paused");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(true);
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [scrubbing, setScrubbing] = useState(false);
  // iOS ignores element volume; only offer mute there.
  const [canSetVolume, setCanSetVolume] = useState(true);

  useEffect(() => {
    const probe = new Audio();
    probe.volume = 0.5;
    setCanSetVolume(probe.volume === 0.5);
  }, []);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    el.volume = volume;
    el.muted = muted;
    el.loop = loop;
  }, [volume, muted, loop]);

  const play = () => {
    const el = audio.current;
    if (!el) return;
    if (el.readyState < 3) setState("loading");
    void el.play().catch(() => setState("paused"));
  };

  const toggle = () => {
    if (audio.current?.paused) play();
    else audio.current?.pause();
  };

  const seek = (t: number) => {
    const el = audio.current;
    if (!el || !duration) return;
    el.currentTime = Math.min(Math.max(t, 0), duration - 0.05);
    setTime(el.currentTime);
  };

  const ratioAt = (clientX: number) => {
    const r = wave.current!.getBoundingClientRect();
    return Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
  };

  const onWaveKey = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: time + SEEK_STEP,
      ArrowUp: time + SEEK_STEP,
      ArrowLeft: time - SEEK_STEP,
      ArrowDown: time - SEEK_STEP,
      Home: 0,
      End: duration,
    };
    if (e.key in moves) {
      e.preventDefault();
      seek(moves[e.key]);
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };

  const progress = duration ? time / duration : 0;
  const playing = state === "playing";
  const level = muted ? 0 : volume;
  const VolumeIcon = level === 0 ? VolumeX : level < 0.5 ? Volume1 : Volume2;

  return (
    <div
      className="player"
      role="group"
      aria-label="Reproductor de la pista"
      data-state={state}
      style={{ "--progress": progress } as React.CSSProperties}
    >
      <button
        type="button"
        className="player-play"
        onClick={toggle}
        aria-label={playing ? "Pausar" : "Reproducir"}
      >
        {state === "loading" ? (
          <LoaderCircle aria-hidden="true" className="spin" />
        ) : playing ? (
          <Pause aria-hidden="true" />
        ) : (
          <Play aria-hidden="true" />
        )}
      </button>

      <div className="player-main">
        <p className="player-head">
          <span className="player-now">
            <span className="eq" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            {playing ? "Sonando" : "Pista oficial"}
          </span>
          <span>Re menor · Dm</span>
        </p>
        <div
          ref={wave}
          className="wave"
          role="slider"
          tabIndex={0}
          aria-label="Posición en la pista"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(time)}
          aria-valuetext={`${formatTime(time)} de ${formatTime(duration)}`}
          onKeyDown={onWaveKey}
          onPointerDown={(e) => {
            if (!duration) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            setScrubbing(true);
            seek(ratioAt(e.clientX) * duration);
          }}
          onPointerMove={(e) => {
            const r = ratioAt(e.clientX);
            if (e.pointerType === "mouse") setHover(r);
            if (scrubbing) seek(r * duration);
          }}
          onPointerUp={() => setScrubbing(false)}
          onPointerCancel={() => setScrubbing(false)}
          onPointerLeave={() => setHover(null)}
        >
          {BARS.map((h, i) => {
            const at = (i + 0.5) / BARS.length;
            return (
              <span
                key={i}
                className={at <= progress ? "on" : undefined}
                style={{ "--h": h } as React.CSSProperties}
              />
            );
          })}
          <i className="wave-head" aria-hidden="true" />
          {hover !== null && duration > 0 && (
            <i className="wave-hover" style={{ left: `${hover * 100}%` }} aria-hidden="true">
              <b>{formatTime(hover * duration)}</b>
            </i>
          )}
        </div>

        <div className="player-bar">
          <span className="player-time">
            {formatTime(time)} <span>/ {duration ? formatTime(duration) : "--:--"}</span>
          </span>

          <button
            type="button"
            className="player-icon player-skip"
            onClick={() => seek(time - SEEK_STEP)}
            aria-label={`Retroceder ${SEEK_STEP} segundos`}
          >
            <RotateCcw aria-hidden="true" />
          </button>
          <button
            type="button"
            className="player-icon player-skip"
            onClick={() => seek(time + SEEK_STEP)}
            aria-label={`Adelantar ${SEEK_STEP} segundos`}
          >
            <RotateCw aria-hidden="true" />
          </button>
          <button
            type="button"
            className="player-icon player-loop"
            onClick={() => setLoop((v) => !v)}
            aria-pressed={loop}
            aria-label="Repetir la pista"
            title={loop ? "Repetir: activado" : "Repetir: desactivado"}
          >
            <Repeat aria-hidden="true" />
          </button>

          <div className="player-volume">
            <button
              type="button"
              className="player-icon"
              onClick={() => {
                if (muted || volume === 0) {
                  setMuted(false);
                  if (volume === 0) setVolume(0.6);
                } else setMuted(true);
              }}
              aria-label={muted ? "Activar sonido" : "Silenciar"}
            >
              <VolumeIcon aria-hidden="true" />
            </button>
            {canSetVolume && (
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={level}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setMuted(false);
                }}
                aria-label="Volumen"
                aria-valuetext={`${Math.round(level * 100)}%`}
                style={{ "--vol": level } as React.CSSProperties}
              />
            )}
          </div>
        </div>
      </div>
      <audio
        ref={audio}
        src={TRACK_URL}
        preload="metadata"
        onPlaying={() => setState("playing")}
        onPause={() => setState("paused")}
        onWaiting={() => setState("loading")}
        onEnded={() => setState("paused")}
        onTimeUpdate={(e) => !scrubbing && setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
    </div>
  );
}

function CaptionBuilder() {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const shown = name.trim() || "[TU NOMBRE]";
  const text = `Hola, soy ${shown} y participo en el segundo concurso de @peruguitar por premios en efectivo. ${HASHTAG}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const sel = window.getSelection();
      const node = document.getElementById("caption-text");
      if (sel && node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  return (
    <div className="caption-card">
      <label className="field">
        <span>Tu nombre</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Ana Quispe"
          autoComplete="name"
          maxLength={60}
        />
      </label>
      <p className="caption-text" id="caption-text">
        Hola, soy <span className={name.trim() ? "slot is-filled" : "slot"}>{shown}</span> y participo en
        el segundo concurso de <span className="tag">@peruguitar</span> por premios en efectivo.{" "}
        <span className="tag">{HASHTAG}</span>
      </p>
      <div className="caption-foot">
        <p className="hint">
          {name.trim() ? "Listo para pegar en tu Reel." : "Escribe tu nombre y el texto se completa solo."}
        </p>
        <button type="button" className="btn btn-brand" onClick={copy}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span aria-live="polite">{copied ? "Texto copiado" : "Copiar texto"}</span>
        </button>
      </div>
    </div>
  );
}

function FollowButton({ label }: { label: string }) {
  return (
    <a className="btn btn-outline" href={INSTAGRAM_URL} target="_blank" rel="noopener">
      <Instagram aria-hidden="true" />
      {label}
      <ArrowUpRight aria-hidden="true" className="btn-trail" />
    </a>
  );
}

export default function Landing() {
  const countdown = useCountdown();
  const { closed } = countdown;

  return (
    <>
      <header className="hero">
        <nav className="topbar" aria-label="Peru Guitar">
          <div className="wrap topbar-inner">
            <a className="brand" href={INSTAGRAM_URL} target="_blank" rel="noopener">
              <img src={`${BASE}logo-light.png`} alt="Peru Guitar" width="687" height="126" />
            </a>
            <a className="top-link" href={INSTAGRAM_URL} target="_blank" rel="noopener">
              <Instagram aria-hidden="true" />
              @peruguitar
            </a>
          </div>
        </nav>

        <div className="wrap hero-grid">
          <div className="hero-body">
            <h1>
              <span className="h1-small">
                <span className="h1-ed">II</span> Concurso de
              </span>
              <span className="h1-line">Solos de</span>
              <span className="h1-line">Guitarra</span>
            </h1>
            <p className="lede">
              Una pista, tu solo y un Reel. Los <strong>3 mejores guitarristas</strong> ganan{" "}
              <strong>premios en efectivo</strong>.
            </p>
            <Countdown {...countdown} />
            <div className="ctas">
              {closed ? (
                <FollowButton label="Sigue los resultados en @peruguitar" />
              ) : (
                <>
                  <TrackPlayer />
                  <a className="btn btn-primary" href={TRACK_URL} download={TRACK_FILENAME}>
                    <ArrowDownToLine aria-hidden="true" />
                    Descargar la pista
                    <span className="btn-meta">{TRACK_META}</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="block wrap split" id="participar" aria-labelledby="pasos">
          <div className="split-head">
            <p className="kicker">Cómo participar</p>
            <h2 id="pasos">Cuatro pasos</h2>
            <p className="muted">De la descarga a la publicación, en este orden.</p>
          </div>
          <ol className="steps">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title}>
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>
                    <Icon aria-hidden="true" />
                    {title}
                  </h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="block wrap split" aria-labelledby="texto">
          <div className="split-head">
            <p className="kicker">Para tu publicación</p>
            <h2 id="texto">Copia este texto</h2>
            <p className="muted">Pégalo como descripción de tu Reel, con el hashtag incluido.</p>
          </div>
          <CaptionBuilder />
        </section>

        <section className="block wrap" aria-labelledby="criterios">
          <p className="kicker">Qué evalúa el jurado</p>
          <h2 id="criterios">Criterios</h2>
          <ul className="criteria">
            {CRITERIA.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="block wrap split" aria-labelledby="etapas">
          <div className="split-head">
            <p className="kicker">Cómo se califica</p>
            <h2 id="etapas">Etapas</h2>
          </div>
          <ol className="phases">
            {STAGES.map(({ icon: Icon, title, body }, i) => {
              const current = i === (closed ? 1 : 0);
              return (
                <li key={title} className={current ? "is-current" : undefined} aria-current={current ? "step" : undefined}>
                  <span className="phase-icon"><Icon aria-hidden="true" /></span>
                  <div>
                    <h3>
                      Etapa {i + 1} · {title}
                      {current && <span className="phase-badge">En curso</span>}
                    </h3>
                    <p>{body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="block wrap" aria-labelledby="terminos">
          <p className="kicker">Letra chica</p>
          <h2 id="terminos">Términos y condiciones</h2>
          <dl className="terms">
            {TERMS.map(({ icon: Icon, term, body }) => (
              <div key={term}>
                <dt>
                  <Icon aria-hidden="true" />
                  {term}
                </dt>
                <dd>{body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <section className="closer" aria-labelledby="cierre">
        <div className="wrap closer-inner">
          <div>
            <h2 id="cierre">{closed ? "Gracias por participar" : "¿Listo para grabar?"}</h2>
            <p>
              {closed
                ? "El jurado anunciará la fecha de resultados."
                : "Participa hasta el 20 de octubre."}
            </p>
          </div>
          {closed ? (
            <FollowButton label="Sigue los resultados en @peruguitar" />
          ) : (
            <a className="btn btn-primary" href={TRACK_URL} download={TRACK_FILENAME}>
              <ArrowDownToLine aria-hidden="true" />
              Descargar la pista
              <span className="btn-meta">{TRACK_META}</span>
            </a>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <img
            className="footer-logo"
            src={`${BASE}logo-light.png`}
            alt="Peru Guitar"
            width="687"
            height="126"
          />
          <p>La primera comunidad de guitarristas del Perú, fundada en 2003.</p>
        </div>
      </footer>
    </>
  );
}
