import React, { useState, useEffect, useRef } from "react";
import logoImage from "./assets/logo.jpg";
import "./App.css";

/* =========================================================================
   Mayank & Somya — Wedding Invitation
   CONFIGURATION — replace the placeholders below with the real details.
   Every piece of copy on the page is driven from this single object.
   ========================================================================= */
const CONFIG = {
  groomName: "Mayank",
  brideName: "Somya",
  groomFullName: "Mayank Raj",
  brideFullName: "Somya Srivastav",

  // The monogram logo is imported from src/assets/logo.jpg (see import above).
  logoDataUrl: logoImage,

  // Small Ganesha blessing image shown above the shloka (served from public/).
  ganeshaUrl: "/ganesha.png",

  groomFatherName: "Vijay Kumar",
  groomMotherName: "Archana Kumar",
  brideFatherName: "Santosh Kumar Suman",
  brideMotherName: "Rupi",

  // Main wedding day — drives the countdown and the hero date line.
  weddingDate: "2026-11-30T19:00:00",
  weddingDateDisplay: "30th November 2026",
  weddingTimeDisplay: "7:00 PM Onwards (Varmala)",

  venueName: "The Monarch Garden",
  venueAddress: "Muzaffarpur, Bihar, India",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("The Monarch Garden, Muzaffarpur, Bihar, India"),

  // Second venue, used for Tilak & Reception — exact pin as shared.
  venueTwoName: "Laheriasarai",
  venueTwoAddress: "Darbhanga, Bihar, India",
  googleMapsUrlTwo: "https://www.google.com/maps/search/?api=1&query=26.121447,85.898546",

  // Background music: the file lives at public/music.mp3 and is served from the
  // site root, so "/music.mp3" is the correct path. Leave empty to disable.
  musicUrl: "/music.mp3",

  story:
    "What began as quiet conversations slowly grew into a bond built on trust, laughter and shared dreams. As Somya and Mayank prepare to begin this new chapter, our families come together in gratitude — for the love that brought them here, and for you, who will make this celebration whole.",

  events: [
    {
      key: "haldi",
      icon: "🌼",
      name: "Haldi",
      date: "29th November 2026",
      time: "11:00 AM",
      venue: "The Monarch Garden, Muzaffarpur",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("The Monarch Garden, Muzaffarpur, Bihar, India"),
      description: "A morning of turmeric, blessings and joyful family rituals. A mehendi stall will also be available for guests.",
    },
    {
      key: "sangeet",
      icon: "🎶",
      name: "Sangeet & Ring Ceremony",
      date: "29th November 2026",
      time: "6:00 PM Onwards",
      venue: "The Monarch Garden, Muzaffarpur",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("The Monarch Garden, Muzaffarpur, Bihar, India"),
      description: "An evening of music, dance and the exchange of rings as both families come together.",
    },
    {
      key: "wedding",
      icon: "💍",
      name: "Wedding",
      date: "30th November 2026 (Overnight)",
      time: "Baraat from 6:00 PM, Varmala from 7:00 PM",
      venue: "The Monarch Garden, Muzaffarpur",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("The Monarch Garden, Muzaffarpur, Bihar, India"),
      description: "The sacred rites uniting Somya and Mayank as wife and husband.",
    },
  ],
};

/* ---------- small utilities ---------- */

/* ---------- lightweight inline icons (no external icon package needed) ---------- */
function Icon({ size = 20, className = "", strokeWidth = 2, fill = "none", children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}
function Heart({ size, className, fill }) {
  return (
    <Icon size={size} className={className} fill={fill || "none"}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </Icon>
  );
}
function MapPin({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}
function Calendar({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </Icon>
  );
}
function Clock({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </Icon>
  );
}
function Volume2({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <polygon points="4 9 8 9 12 4 12 20 8 15 4 15 4 9" />
      <path d="M17 7a6 6 0 0 1 0 10" />
      <path d="M15 10a2.5 2.5 0 0 1 0 4" />
    </Icon>
  );
}
function VolumeX({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <polygon points="4 9 8 9 12 4 12 20 8 15 4 15 4 9" />
      <line x1="17" y1="9" x2="22" y2="14" />
      <line x1="22" y1="9" x2="17" y2="14" />
    </Icon>
  );
}
function Flower2({ size, className, strokeWidth }) {
  return (
    <Icon size={size} className={className} strokeWidth={strokeWidth || 2}>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 2c1.8 0 3 1.6 3 3.4S13.8 9 12 9 9 7.6 9 5.4 10.2 2 12 2Z" />
      <path d="M12 15c1.8 0 3 1.6 3 3.4S13.8 22 12 22 9 20.6 9 18.4 10.2 15 12 15Z" />
      <path d="M2 12c0-1.8 1.6-3 3.4-3S9 10.2 9 12s-1.6 3-3.6 3S2 13.8 2 12Z" />
      <path d="M15 12c0-1.8 1.6-3 3.6-3S22 10.2 22 12s-1.6 3-3.4 3S15 13.8 15 12Z" />
    </Icon>
  );
}
function Sparkles({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </Icon>
  );
}
function Navigation({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </Icon>
  );
}


function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ---------- decorative pieces ---------- */

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
      <span className="divider-line" />
      <Flower2 size={16} className="gold-icon" strokeWidth={1.5} />
      <span className="divider-line" />
    </div>
  );
}

function CornerFlourish({ position = "top-left" }) {
  const rotations = {
    "top-left": "rotate(0deg)",
    "top-right": "rotate(90deg)",
    "bottom-right": "rotate(180deg)",
    "bottom-left": "rotate(270deg)",
  };
  const placements = {
    "top-left": { top: 10, left: 10 },
    "top-right": { top: 10, right: 10 },
    "bottom-right": { bottom: 10, right: 10 },
    "bottom-left": { bottom: 10, left: 10 },
  };
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      style={{ position: "absolute", transform: rotations[position], ...placements[position] }}
      className="corner-flourish"
      aria-hidden="true"
    >
      <path
        d="M2 2 C 2 20, 20 44, 44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="2" cy="2" r="2.4" fill="currentColor" />
      <path d="M8 8 C 8 20, 20 32, 32 32" fill="none" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

function ArchOutline() {
  return (
    <svg
      viewBox="0 0 320 420"
      className="arch-outline"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="arch-path"
        d="M10 410 V 150 C 10 60, 80 10, 160 10 C 240 10, 310 60, 310 150 V 410"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        className="arch-path arch-path-inner"
        d="M32 410 V 155 C 32 78, 90 34, 160 34 C 230 34, 288 78, 288 155 V 410"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function MandalaRing() {
  const dots = Array.from({ length: 16 });
  return (
    <svg viewBox="0 0 200 200" className="mandala-ring" aria-hidden="true">
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 6" />
      {dots.map((_, i) => {
        const angle = (i / dots.length) * Math.PI * 2;
        const x = 100 + Math.cos(angle) * 96;
        const y = 100 + Math.sin(angle) * 96;
        return <circle key={i} cx={x} cy={y} r="1.6" fill="currentColor" />;
      })}
    </svg>
  );
}

function ArchCap() {
  return (
    <svg viewBox="0 0 100 40" className="arch-cap" aria-hidden="true">
      <path
        d="M2 38 V 20 C 2 8, 20 2, 50 2 C 80 2, 98 8, 98 20 V 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="50" cy="2" r="2" fill="currentColor" />
    </svg>
  );
}

function Petals({ enabled }) {
  if (!enabled) return null;
  const petals = Array.from({ length: 10 });
  return (
    <div className="petals-layer" aria-hidden="true">
      {petals.map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 97) % 100}%`,
            animationDelay: `${i * 1.8}s`,
            animationDuration: `${14 + (i % 5) * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- countdown ---------- */

function getTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

function Countdown() {
  const target = CONFIG.weddingDate ? new Date(CONFIG.weddingDate).getTime() : null;
  const [left, setLeft] = useState(target ? getTimeLeft(target) : null);

  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = target
    ? [
        { label: "Days", value: left.d },
        { label: "Hours", value: left.h },
        { label: "Minutes", value: left.m },
        { label: "Seconds", value: left.s },
      ]
    : [
        { label: "Days", value: "—" },
        { label: "Hours", value: "—" },
        { label: "Minutes", value: "—" },
        { label: "Seconds", value: "—" },
      ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
        {units.map((u) => (
          <div key={u.label} className="countdown-box">
            <div className="countdown-value">{String(u.value).padStart(2, "0")}</div>
            <div className="countdown-label">{u.label}</div>
          </div>
        ))}
      </div>
      {!target && (
        <p className="text-center text-xs mt-4 muted-text">
          The countdown will begin once the wedding date is confirmed.
        </p>
      )}
    </div>
  );
}

/* ---------- event timeline ---------- */

function EventCard({ event, index }) {
  return (
    <Reveal delay={index * 80}>
      <div className="event-card">
        <div className="event-icon">{event.icon}</div>
        <div className="flex-1">
          <h3 className="event-name">{event.name}</h3>
          <p className="event-desc">{event.description}</p>
          <div className="event-meta">
            <span className="event-meta-item">
              <Calendar size={13} className="gold-icon" /> {event.date}
            </span>
            <span className="event-meta-item">
              <Clock size={13} className="gold-icon" /> {event.time}
            </span>
            <span className="event-meta-item">
              <MapPin size={13} className="gold-icon" /> {event.venue}
            </span>
          </div>
          <a
            href={event.mapsUrl || CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="event-map-btn"
          >
            <Navigation size={13} /> View on Map
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- music toggle ---------- */

function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  const toggle = () => {
    if (!CONFIG.musicUrl) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      startedRef.current = true;
      audio.muted = false;
      audio.volume = 1;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  // Strategy to make even a SCROLL start the music on Android:
  //
  // Android Chrome won't start *audible* audio without a user gesture, and when
  // a touch turns into a scroll it often isn't counted as that gesture. The
  // workaround is a two-stage "prime then unmute":
  //   1. On the very first touch/scroll signal, start playing the track MUTED.
  //      A muted play is far more permissive and Android usually allows it even
  //      as a scroll begins.
  //   2. The instant that muted playback is running, unmute it — now it's
  //      already an active audio stream, so turning the sound on is allowed.
  // We keep listening until audible playback is truly confirmed, retrying on
  // every subsequent touch/scroll so nothing is lost if the first attempt is
  // swallowed.
  // Eagerly begin buffering the audio as soon as the component mounts, so the
  // file is already downloaded by the time the guest taps — no gap before sound.
  useEffect(() => {
    if (!CONFIG.musicUrl) return;
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.load();
      } catch (e) {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    if (!CONFIG.musicUrl) return;

    const events = [
      "touchstart",
      "touchmove",
      "touchend",
      "pointerdown",
      "mousedown",
      "click",
      "keydown",
      "scroll",
      "wheel",
    ];

    const targets = [window, document, document.body].filter(Boolean);

    const removeListeners = () => {
      targets.forEach((t) =>
        events.forEach((e) => t.removeEventListener(e, tryStart, true))
      );
    };

    const tryStart = () => {
      if (startedRef.current) return;
      const audio = audioRef.current;
      if (!audio) return;

      // Stage 1: start muted (permissive), then Stage 2: unmute once running.
      audio.muted = true;
      const p = audio.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          startedRef.current = true;
          audio.muted = false;
          audio.volume = 1;
          setPlaying(true);
          removeListeners();
        }).catch(() => {
          // Swallowed (often mid-scroll). Reset mute and let the next
          // touch/scroll try again.
          audio.muted = false;
        });
      } else {
        startedRef.current = true;
        audio.muted = false;
        setPlaying(true);
        removeListeners();
      }
    };

    targets.forEach((t) =>
      events.forEach((e) =>
        t.addEventListener(e, tryStart, { capture: true, passive: true })
      )
    );

    return removeListeners;
  }, []);

  return (
    <div className="music-toggle-wrap">
      {CONFIG.musicUrl && (
        <audio ref={audioRef} src={CONFIG.musicUrl} loop preload="auto" playsInline />
      )}
      <button
        className="music-toggle"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        title={CONFIG.musicUrl ? "Toggle background music" : "Add a music URL in CONFIG to enable"}
      >
        {playing ? <Volume2 size={17} /> : <VolumeX size={17} />}
      </button>
    </div>
  );
}

/* ---------- cinematic "opening the card" intro ---------- */

function IntroCover({ reducedMotion }) {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setHidden(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setOpened(true), 1500);
    const t2 = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
    }, 2650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  if (hidden) return null;

  return (
    <div className={`intro-cover ${opened ? "intro-cover-open" : ""}`} aria-hidden="true">
      <div className="intro-panel intro-panel-left">
        <span className="intro-panel-line" />
      </div>
      <div className="intro-panel intro-panel-right">
        <span className="intro-panel-line" />
      </div>
      <div className="intro-seal">
        <svg viewBox="0 0 90 90" className="intro-seal-ring">
          <circle cx="45" cy="45" r="42" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="45" cy="45" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 5" />
        </svg>
        <span className="intro-seal-text">M &amp; S</span>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN PAGE
   ========================================================================= */

export default function App() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={`invite-root ${reducedMotion ? "reduce-motion" : ""}`}>
      <IntroCover reducedMotion={reducedMotion} />

      {/* ================= HERO ================= */}
      <section className="hero">
        <Petals enabled={!reducedMotion} />
        <img src={CONFIG.logoDataUrl} alt={`${CONFIG.brideName} & ${CONFIG.groomName} monogram`} className="hero-logo" />
        <div className="arch-wrap">
          <MandalaRing />
          <ArchOutline />
          <div className="arch-content">
            {CONFIG.ganeshaUrl && (
              <img src={CONFIG.ganeshaUrl} alt="Lord Ganesha" className="ganesha-img" />
            )}
            <p className="shloka">॥ श्री गणेशाय नमः ॥</p>
            <p className="blessing-line">With the blessings of the Almighty and our elders</p>
            <p className="invite-line">
              {CONFIG.brideMotherName} &amp; {CONFIG.brideFatherName}
              <br />
              warmly invite you to celebrate the wedding of their beloved daughter
            </p>
          </div>
        </div>

        <h1 className="couple-names">
          <span className="shimmer-name">{CONFIG.brideName}</span>
          <span className="amp">with</span>
          <span className="shimmer-name">{CONFIG.groomName}</span>
        </h1>

        <p className="hero-date">
          {CONFIG.weddingDateDisplay}
          <span className="sep">•</span>
          {CONFIG.venueName}
        </p>

        <p className="scroll-cue">Scroll to unveil the invitation</p>
      </section>

      {/* ================= FAMILY MESSAGE ================= */}
      <section className="section">
        <Reveal>
          <p className="eyebrow">With Love</p>
          <h2 className="section-title">From Our Family</h2>
        </Reveal>
        <GoldDivider />
        <Reveal delay={100}>
          <div className="message-card">
            <CornerFlourish position="top-left" />
            <CornerFlourish position="bottom-right" />
            <ArchCap />
            <p className="message-text">
              With the blessings of the Almighty and our elders and immense joy in our hearts, we invite you and
              your family to join us as we celebrate the wedding of our beloved daughter,{" "}
              {CONFIG.brideFullName}, with {CONFIG.groomFullName}.
              <br />
              <br />
              Your presence and blessings will make this joyous occasion even more special for
              our family.
            </p>
            <p className="message-sign">
              {CONFIG.brideMotherName} &amp; {CONFIG.brideFatherName}
              <br />
              {CONFIG.groomMotherName} &amp; {CONFIG.groomFatherName}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ================= COUNTDOWN ================= */}
      <section className="section section-alt">
        <Reveal>
          <p className="eyebrow">Save The Date</p>
          <h2 className="section-title">Counting Down to the Celebration</h2>
        </Reveal>
        <GoldDivider />
        <Reveal delay={100}>
          <Countdown />
        </Reveal>
      </section>

      {/* ================= EVENTS ================= */}
      <section className="section" id="events">
        <Reveal>
          <p className="eyebrow">The Celebrations</p>
          <h2 className="section-title">Wedding Events</h2>
        </Reveal>
        <GoldDivider />
        <div className="mt-6">
          {CONFIG.events.map((ev, i) => (
            <EventCard event={ev} index={i} key={ev.key} />
          ))}
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="section section-alt">
        <Reveal>
          <p className="eyebrow">A Beautiful Beginning</p>
          <h2 className="section-title" style={{ fontSize: 26 }}>
            {CONFIG.brideName} &amp; {CONFIG.groomName}
          </h2>
        </Reveal>
        <GoldDivider />
        <Reveal delay={100}>
          <p
            className="font-display"
            style={{
              textAlign: "center",
              fontStyle: "italic",
              fontSize: 17,
              lineHeight: 1.8,
              color: "var(--ink-soft)",
            }}
          >
            {CONFIG.story}
          </p>
        </Reveal>
      </section>

      {/* ================= VENUE ================= */}
      <section className="section">
        <Reveal>
          <p className="eyebrow">Join Us At</p>
          <h2 className="section-title">The Wedding Venue</h2>
        </Reveal>
        <GoldDivider />
        <Reveal delay={100}>
          <div className="venue-card">
            <ArchCap />
            <p className="venue-name">{CONFIG.venueName}</p>
            <p className="venue-address">{CONFIG.venueAddress}</p>
            <div className="venue-buttons">
              <a
                className="btn-gold"
                href={CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={14} /> View Location
              </a>
              <a
                className="btn-outline"
                href={CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation size={14} /> Get Directions
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <Sparkles size={22} className="gold-icon mx-auto mb-4" />
        <p className="footer-blessing">With blessings and love</p>
        <p className="footer-parents">
          {CONFIG.brideMotherName} &amp; {CONFIG.brideFatherName}
          <br />
          {CONFIG.groomMotherName} &amp; {CONFIG.groomFatherName}
        </p>
        <p className="footer-couple">
          {CONFIG.brideFullName}{" "}
          <Heart size={16} className="inline gold-icon" fill="currentColor" />{" "}
          {CONFIG.groomFullName}
        </p>
        <p className="footer-note">
          We look forward to celebrating this beautiful occasion with you and your family.
        </p>
      </footer>

      <MusicToggle />
    </div>
  );
}
