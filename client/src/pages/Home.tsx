import { useEffect, useMemo, useState } from "react";
import {
  AlarmClock,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  CircleHelp,
  Clipboard,
  Clock3,
  Command,
  ExternalLink,
  Flame,
  History,
  Keyboard,
  Library,
  Menu,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

type StateKey = "scattered" | "anxious" | "avoiding" | "just-start";
type LooseEnd = { id: number; text: string; lane: "inbox" | "later" | "release"; createdAt: string };
type HistoryItem = { id: number; action: string; outcome: "started" | "partial" | "not-yet"; date: string };

type Video = {
  title: string;
  creator: string;
  duration: string;
  tag: string;
  color: string;
  url: string;
};

const VIDEO_LIBRARY: Video[] = [
  { title: "Calm Stress & Anxiety | 2 Minute 4-6 Breathing", creator: "Mindset Development", duration: "2:37", tag: "FAST CALM", color: "bg-[#ff6b54]", url: "https://www.youtube.com/watch?v=YinB9cn3VL0" },
  { title: "The 5-4-3-2-1 Method: A Grounding Exercise to Manage Anxiety", creator: "The Partnership In Education", duration: "4:28", tag: "GROUNDING", color: "bg-[#69e8c5]", url: "https://www.youtube.com/watch?v=30VMIEmA114" },
  { title: "Pomodoro Timer Body Doubling!", creator: "Hayley Honeyman", duration: "1:41:48", tag: "QUIET COMPANY", color: "bg-[#f7d447]", url: "https://www.youtube.com/watch?v=wnwTVlPRJaA" },
  { title: "This Grounding Technique Stops Anxious Thoughts Immediately", creator: "Fostering Resilience", duration: "5:28", tag: "SENSES", color: "bg-[#a9a1ff]", url: "https://www.youtube.com/watch?v=q_L_DiqoRn4" },
  { title: "Progressive Muscle Relaxation for Beginners", creator: "Hands-On Meditation", duration: "5:55", tag: "BODY RELEASE", color: "bg-[#ffb4e5]", url: "https://www.youtube.com/watch?v=Z21Xslddz3Y" },
  { title: "4 Types of Overthinking and How to Stop Them", creator: "Therapy in a Nutshell", duration: "19:51", tag: "COGNITIVE RESET", color: "bg-[#b9e0ff]", url: "https://www.youtube.com/watch?v=28BkdLXQA-c" },
];

const stateOptions: { key: StateKey; label: string; sub: string; className: string; accent: string }[] = [
  { key: "scattered", label: "SCATTERED", sub: "Too many tabs open", className: "bg-[#69e8c5]", accent: "mint" },
  { key: "anxious", label: "ANXIOUS", sub: "Brain is running hot", className: "bg-[#ff6b54]", accent: "coral" },
  { key: "avoiding", label: "AVOIDING", sub: "I know, I just can't start", className: "bg-[#a9a1ff]", accent: "lavender" },
  { key: "just-start", label: "JUST START", sub: "Give me the shortest runway", className: "bg-[#f7d447]", accent: "yellow" },
];

const initialLooseEnds: LooseEnd[] = [
  { id: 1, text: "Reply to Maya about Friday's launch", lane: "inbox", createdAt: "Today" },
  { id: 2, text: "Open the deck and write the 3 section headings", lane: "inbox", createdAt: "Today" },
  { id: 3, text: "Book dentist appointment", lane: "later", createdAt: "Yesterday" },
];

function formatTime(seconds: number) {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

function todayLabel() {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
}

export default function Home() {
  const [activeState, setActiveState] = useState<StateKey>("scattered");
  const [step, setStep] = useState(0);
  const [looseEnds, setLooseEnds] = useState<LooseEnd[]>(() => {
    try { return JSON.parse(localStorage.getItem("tidyup-loose-ends") || "null") || initialLooseEnds; } catch { return initialLooseEnds; }
  });
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("tidyup-history") || "[]"); } catch { return []; }
  });
  const [capture, setCapture] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(2);
  const [nextAction, setNextAction] = useState("Open the deck and write the 3 section headings");
  const [duration, setDuration] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [distraction, setDistraction] = useState("");
  const [toastText, setToastText] = useState("");

  const inbox = useMemo(() => looseEnds.filter((item) => item.lane === "inbox"), [looseEnds]);
  const later = useMemo(() => looseEnds.filter((item) => item.lane === "later"), [looseEnds]);
  const completedCount = history.filter((item) => item.outcome !== "not-yet").length;
  const progress = 100 - Math.round((secondsLeft / (duration * 60)) * 100);
  const selectedState = stateOptions.find((item) => item.key === activeState) || stateOptions[0];

  useEffect(() => { localStorage.setItem("tidyup-loose-ends", JSON.stringify(looseEnds)); }, [looseEnds]);
  useEffect(() => { localStorage.setItem("tidyup-history", JSON.stringify(history)); }, [history]);

  useEffect(() => {
    if (!isRunning || isPaused) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setIsRunning(false);
          setStep(4);
          toast.success("Time is up. You showed up.");
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning, isPaused]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key.toLowerCase() === "n") document.getElementById("capture-box")?.focus();
      if (event.key.toLowerCase() === "r") startReset();
      if (event.key === "?" || (event.key === "/" && event.shiftKey)) setShowHelp((value) => !value);
      if (event.key === "Escape") { setShowLibrary(false); setShowHistory(false); setShowHelp(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function startReset() {
    setStep(1);
    setToastText("RESET started");
    window.setTimeout(() => setToastText(""), 1800);
  }

  function addCaptured() {
    const lines = capture.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length) { toast.error("Write at least one loose end first."); return; }
    const created = lines.map((text, index) => ({ id: Date.now() + index, text, lane: "inbox" as const, createdAt: "Just now" }));
    setLooseEnds((items) => [...created, ...items]);
    setCapture("");
    toast.success(`${created.length} ${created.length === 1 ? "loose end" : "loose ends"} captured.`);
  }

  function chooseItem(item: LooseEnd) {
    setSelectedId(item.id);
    setNextAction(item.text);
  }

  function moveItem(id: number, lane: LooseEnd["lane"]) {
    setLooseEnds((items) => items.map((item) => item.id === id ? { ...item, lane } : item));
    if (lane === "release") toast("Released. You do not need to carry everything.");
  }

  function deleteItem(id: number) { setLooseEnds((items) => items.filter((item) => item.id !== id)); }

  function beginTimer() {
    setSecondsLeft(duration * 60);
    setIsRunning(true);
    setIsPaused(false);
    setStep(3);
    toast.success(`${duration}-minute runway started.`);
  }

  function finishSession(outcome: HistoryItem["outcome"]) {
    const item = { id: Date.now(), action: nextAction, outcome, date: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) };
    setHistory((items) => [item, ...items].slice(0, 20));
    setIsRunning(false);
    setStep(5);
    toast.success(outcome === "started" ? "Started is a win." : "Logged. No shame, just data.");
  }

  function resetAll() {
    localStorage.removeItem("tidyup-loose-ends");
    localStorage.removeItem("tidyup-history");
    setLooseEnds(initialLooseEnds);
    setHistory([]);
    setStep(0);
    toast("Local data cleared.");
  }

  return (
    <div className="min-h-screen bg-[#f6f2e8] text-[#191919] selection:bg-[#ff6b54] selection:text-[#191919]">
      <header className="sticky top-0 z-40 border-b-[3px] border-[#191919] bg-[#f6f2e8]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 md:px-8">
          <button onClick={() => { setStep(0); setShowLibrary(false); }} className="group flex items-center gap-3 text-left">
            <div className="grid h-10 w-10 place-items-center border-[3px] border-[#191919] bg-[#f7d447] shadow-[3px_3px_0_#191919] transition-transform group-hover:-translate-y-0.5 group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-none"><Zap className="h-5 w-5 fill-[#191919]" /></div>
            <div><div className="font-display text-xl font-black leading-none tracking-tight">TIDYUP<span className="text-[#ff6b54]">.</span></div><div className="font-mono text-[9px] font-bold tracking-[0.2em]">THE ONE-MINUTE RESET</div></div>
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <button onClick={() => setShowHistory(true)} className="brutal-button bg-white"><History className="h-4 w-4" /> HISTORY <span className="kbd">H</span></button>
            <button onClick={() => setShowLibrary(true)} className="brutal-button bg-[#69e8c5]"><Library className="h-4 w-4" /> LIBRARY</button>
            <button onClick={() => setShowHelp(true)} className="icon-button bg-[#a9a1ff]" aria-label="Keyboard help"><CircleHelp className="h-5 w-5" /></button>
          </div>
          <button className="icon-button bg-white md:hidden" onClick={() => setMobileMenu((value) => !value)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
        </div>
        {mobileMenu && <div className="border-t-[3px] border-[#191919] px-4 py-3 md:hidden"><div className="flex gap-2"><button onClick={() => { setShowHistory(true); setMobileMenu(false); }} className="brutal-button bg-white"><History className="h-4 w-4" /> HISTORY</button><button onClick={() => { setShowLibrary(true); setMobileMenu(false); }} className="brutal-button bg-[#69e8c5]"><Library className="h-4 w-4" /> LIBRARY</button></div></div>}
      </header>

      <main className="mx-auto max-w-[1500px] px-4 pb-16 pt-7 md:px-8 md:pt-10">
        <div className="mb-8 grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.16em]"><span className="inline-block h-2.5 w-2.5 bg-[#ff6b54]" /> {todayLabel()} <span className="text-black/40">/</span> RESET 00{Math.max(step, 1)}</div>
            <h1 className="font-display max-w-5xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.065em] sm:text-7xl lg:text-[7.3rem]">Make space.<br /><span className="text-[#ff6b54]">Make a move.</span></h1>
          </div>
          <div className="max-w-md justify-self-end border-[3px] border-[#191919] bg-[#191919] p-5 text-[#f6f2e8] shadow-[8px_8px_0_#ff6b54]">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.18em] text-[#69e8c5]"><Sparkles className="h-4 w-4" /> THE RULE</div>
            <p className="font-display text-xl font-black leading-tight">You do not need a new life. You need one visible next action.</p>
            <p className="mt-3 font-mono text-[10px] leading-relaxed text-white/65">TidyUp is a local-first reset tool for when your brain is loud and the starting line is blurry.</p>
          </div>
        </div>

        <section className="mb-7 grid gap-4 md:grid-cols-4">
          {stateOptions.map((option) => (
            <button key={option.key} onClick={() => { setActiveState(option.key); startReset(); }} className={`state-card ${option.className} ${activeState === option.key ? "state-card-active" : ""}`}>
              <div className="flex items-start justify-between"><span className="font-mono text-[10px] font-black tracking-[0.16em]">{option.accent === "coral" ? "01" : option.accent === "mint" ? "02" : option.accent === "lavender" ? "03" : "04"}</span><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></div>
              <div className="mt-8 text-left"><div className="font-display text-2xl font-black tracking-tight">{option.label}</div><div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wide opacity-65">{option.sub}</div></div>
            </button>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <section className="border-[3px] border-[#191919] bg-white shadow-[8px_8px_0_#191919]">
            <div className="flex items-start justify-between border-b-[3px] border-[#191919] bg-[#a9a1ff] px-5 py-4 md:px-7">
              <div><div className="font-mono text-[10px] font-black tracking-[0.16em]">CURRENT RESET / {String(step).padStart(2, "0")}</div><h2 className="mt-2 font-display text-3xl font-black uppercase leading-none tracking-tight">{step === 0 ? "Pick your starting point" : step === 1 ? "Regulate first" : step === 2 ? "Get it out of your head" : step === 3 ? "Protect the start" : step === 4 ? "Close the loop" : "You made a move"}</h2></div>
              {step > 0 && <button className="icon-button bg-white" onClick={() => setStep((value) => Math.max(0, value - 1))} aria-label="Back"><ChevronLeft className="h-5 w-5" /></button>}
            </div>
            <div className="p-5 md:p-7">
              {step === 0 && <div className="grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-center"><div><p className="max-w-xl text-lg font-semibold leading-snug">Pick the sentence that sounds most like your brain right now. We’ll give you the shortest useful route out.</p><button onClick={startReset} className="brutal-button mt-6 bg-[#f7d447] text-base">START A 3-MINUTE RESET <ArrowRight className="h-5 w-5" /></button></div><div className="relative border-[3px] border-[#191919] bg-[#f6f2e8] p-5"><div className="absolute -right-3 -top-3 rotate-3 border-[3px] border-[#191919] bg-[#ff6b54] px-2 py-1 font-mono text-[10px] font-black">NO PERFORMANCE REQUIRED</div><div className="font-display text-5xl font-black leading-none">0<span className="text-[#ff6b54]">→</span>1</div><div className="mt-2 font-mono text-[10px] font-bold leading-relaxed">The goal is not to fix everything.<br />The goal is to change the next minute.</div></div></div>}

              {step === 1 && <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center"><div className="breath-orbit"><div className="breath-core"><div className="font-mono text-[10px] font-black tracking-[0.16em]">BREATHE</div><div className="mt-2 font-display text-4xl font-black">4 / 6</div><div className="font-mono text-[9px] font-bold">IN / OUT × 6</div></div></div><div><div className="font-display text-3xl font-black uppercase leading-none">Lower the volume.</div><p className="mt-3 max-w-md text-sm font-semibold leading-relaxed">Feet on the floor. Jaw loose. Inhale for 4, exhale for 6. If focusing on your breath feels uncomfortable, use your senses instead.</p><div className="mt-5 flex flex-wrap gap-2"><button onClick={() => setStep(2)} className="brutal-button bg-[#69e8c5]">I FEEL 1% MORE HERE <ArrowRight className="h-4 w-4" /></button><button onClick={() => setStep(2)} className="brutal-button bg-white">USE 5-4-3-2-1</button></div></div></div>}

              {step === 2 && <div><label htmlFor="capture-box" className="font-mono text-xs font-black uppercase tracking-[0.16em]">What is taking up space in your head?</label><textarea id="capture-box" value={capture} onChange={(event) => setCapture(event.target.value)} placeholder="Paste a messy list. No sorting yet.\nreply to Sam\nstart the report\nbook dentist" className="mt-3 min-h-36 w-full resize-y border-[3px] border-[#191919] bg-[#f6f2e8] p-4 font-mono text-sm font-bold outline-none placeholder:text-black/35 focus:bg-[#fffbed] focus:shadow-[5px_5px_0_#69e8c5]" /><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-[10px] font-bold uppercase tracking-wide text-black/50">{capture.split("\n").filter((line) => line.trim()).length} loose ends ready</span><button onClick={() => { addCaptured(); setStep(3); }} className="brutal-button bg-[#ff6b54]">CAPTURE + CHOOSE ONE <ArrowRight className="h-4 w-4" /></button></div></div>}

              {step === 3 && <div><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><div className="font-mono text-[10px] font-black tracking-[0.16em]">ONE ACTIVE ACTION ONLY</div><div className="mt-1 font-display text-2xl font-black uppercase">Make the first move tiny.</div></div><div className="border-[3px] border-[#191919] bg-[#f7d447] px-3 py-2 font-mono text-[10px] font-black">{inbox.length} IN INBOX</div></div><div className="grid gap-3">{inbox.length === 0 && <div className="border-[3px] border-dashed border-[#191919] p-5 font-mono text-sm font-bold">Inbox clear. Add one above or pick something from later.</div>}{inbox.map((item) => <div key={item.id} className={`queue-card ${selectedId === item.id ? "queue-card-selected" : ""}`}><button onClick={() => chooseItem(item)} className="flex min-w-0 flex-1 items-start gap-3 text-left"><span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border-[2px] border-[#191919] ${selectedId === item.id ? "bg-[#69e8c5]" : "bg-white"}`}>{selectedId === item.id && <Check className="h-3 w-3" />}</span><span className="font-semibold leading-snug">{item.text}</span></button><div className="flex items-center gap-1"><button onClick={() => moveItem(item.id, "later")} className="mini-button" title="Park for later"><Clock3 className="h-4 w-4" /></button><button onClick={() => deleteItem(item.id)} className="mini-button text-[#ff6b54]" title="Delete"><Trash2 className="h-4 w-4" /></button></div></div>)}</div><div className="mt-5 border-[3px] border-[#191919] bg-[#f6f2e8] p-4"><div className="font-mono text-[10px] font-black tracking-[0.16em]">YOUR NEXT VISIBLE ACTION</div><input value={nextAction} onChange={(event) => setNextAction(event.target.value)} className="mt-2 w-full border-b-[3px] border-[#191919] bg-transparent pb-2 font-display text-xl font-black outline-none" /><div className="mt-4 flex flex-wrap items-center gap-2"><span className="mr-1 font-mono text-[10px] font-black">RUNWAY:</span>{[5, 15, 25].map((value) => <button key={value} onClick={() => setDuration(value)} className={`duration-button ${duration === value ? "duration-active" : ""}`}>{value} MIN</button>)}<button onClick={beginTimer} className="brutal-button ml-auto bg-[#69e8c5]"><Play className="h-4 w-4 fill-current" /> START</button></div></div></div>}

              {step === 4 && <div><div className="timer-face"><div className="font-mono text-[10px] font-black tracking-[0.18em]">PROTECTED START / {duration} MIN</div><div className="my-3 font-display text-7xl font-black tracking-[-0.06em] sm:text-8xl">{formatTime(secondsLeft)}</div><div className="mx-auto max-w-xl font-display text-2xl font-black leading-tight">{nextAction}</div><div className="mt-5 flex flex-wrap justify-center gap-2"><button onClick={() => setIsPaused((value) => !value)} className="brutal-button bg-[#f7d447]">{isPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4" />}{isPaused ? "RESUME" : "PAUSE"}</button><button onClick={() => setStep(3)} className="brutal-button bg-white"><RotateCcw className="h-4 w-4" /> MAKE IT SMALLER</button></div></div><div className="mt-4 flex gap-2"><input value={distraction} onChange={(event) => setDistraction(event.target.value)} placeholder="Not now — remember this…" className="min-w-0 flex-1 border-[3px] border-[#191919] bg-[#f6f2e8] px-3 py-3 font-mono text-xs font-bold outline-none" /><button onClick={() => { if (distraction) toast("Saved for later. Back to the action."); setDistraction(""); }} className="brutal-button bg-[#a9a1ff]">PARK IT</button></div></div>}

              {step === 5 && <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-center"><div className="grid h-40 w-40 place-items-center border-[3px] border-[#191919] bg-[#69e8c5] shadow-[7px_7px_0_#191919]"><CheckCircle2 className="h-20 w-20" /></div><div><div className="font-mono text-[10px] font-black tracking-[0.16em]">RESET COMPLETE</div><div className="mt-2 font-display text-4xl font-black uppercase leading-[0.9]">Started is a win.</div><p className="mt-3 max-w-md text-sm font-semibold leading-relaxed">You do not need to finish everything to change the direction of a day. Log what happened, then decide whether there is a next tiny move.</p><div className="mt-5 flex flex-wrap gap-2"><button onClick={() => finishSession("started")} className="brutal-button bg-[#f7d447]">I STARTED <Check className="h-4 w-4" /></button><button onClick={() => finishSession("partial")} className="brutal-button bg-white">PARTLY</button><button onClick={() => finishSession("not-yet")} className="brutal-button bg-white">NOT YET</button></div></div></div>}
            </div>
            <div className="flex items-center justify-between border-t-[3px] border-[#191919] bg-[#191919] px-5 py-3 font-mono text-[10px] font-bold text-white/70 md:px-7"><span>STEP {Math.min(step + 1, 5)} / 5</span><div className="flex gap-1">{[0,1,2,3,4].map((dot) => <span key={dot} className={`h-2 w-8 ${dot <= step ? "bg-[#ff6b54]" : "bg-white/20"}`} />)}</div><span>{selectedState.label}</span></div>
          </section>

          <div className="space-y-6">
            <section className="border-[3px] border-[#191919] bg-[#191919] p-5 text-[#f6f2e8] shadow-[8px_8px_0_#a9a1ff] md:p-6"><div className="flex items-center justify-between"><div className="font-mono text-[10px] font-black tracking-[0.16em] text-[#69e8c5]">LOOSE ENDS / INBOX</div><button onClick={() => document.getElementById("capture-box")?.focus()} className="grid h-8 w-8 place-items-center border-[2px] border-[#f6f2e8] text-[#f6f2e8] transition-colors hover:bg-[#69e8c5] hover:text-[#191919]"><Plus className="h-4 w-4" /></button></div><div className="mt-4 space-y-2">{inbox.slice(0, 3).map((item) => <button key={item.id} onClick={() => { setSelectedId(item.id); setNextAction(item.text); setStep(3); }} className="flex w-full items-start gap-3 border-b border-white/15 py-3 text-left transition-transform hover:translate-x-1"><span className="mt-1 h-3 w-3 shrink-0 border-[2px] border-[#69e8c5]" /><span className="text-sm font-semibold leading-snug">{item.text}</span></button>)}{inbox.length === 0 && <div className="py-4 font-mono text-xs text-white/50">Inbox clear. Nice.</div>}</div><button onClick={() => { setStep(2); document.getElementById("capture-box")?.focus(); }} className="mt-4 flex items-center gap-2 font-mono text-[10px] font-black tracking-[0.12em] text-[#69e8c5]">CAPTURE A LOOSE END <ArrowRight className="h-4 w-4" /></button></section>
            <section className="border-[3px] border-[#191919] bg-[#f7d447] p-5 shadow-[8px_8px_0_#191919] md:p-6"><div className="flex items-center justify-between"><div className="font-mono text-[10px] font-black tracking-[0.16em]">TODAY’S SIGNAL</div><Flame className="h-5 w-5" /></div><div className="mt-4 flex items-end gap-3"><div className="font-display text-6xl font-black leading-none">{completedCount}</div><div className="pb-1 font-mono text-[10px] font-black uppercase leading-tight">resets logged<br />this session</div></div><div className="mt-5 h-3 border-[2px] border-[#191919] bg-white"><div className="h-full bg-[#ff6b54] transition-all" style={{ width: `${Math.min(100, completedCount * 20)}%` }} /></div><div className="mt-3 flex justify-between font-mono text-[10px] font-bold uppercase"><span>momentum</span><span>{completedCount >= 3 ? "building" : "warming up"}</span></div></section>
            <section className="border-[3px] border-[#191919] bg-white p-5 md:p-6"><div className="flex items-center justify-between"><div><div className="font-mono text-[10px] font-black tracking-[0.16em]">PARKED FOR LATER</div><div className="mt-1 font-display text-2xl font-black">{later.length} items</div></div><Clock3 className="h-7 w-7" /></div><div className="mt-4 space-y-2">{later.slice(0, 2).map((item) => <div key={item.id} className="flex items-center gap-2 border-t-[2px] border-[#191919] pt-2 text-xs font-bold"><span className="h-2 w-2 bg-[#a9a1ff]" />{item.text}</div>)}{later.length === 0 && <div className="font-mono text-xs text-black/45">Nothing parked.</div>}</div></section>
          </div>
        </div>

        <section className="mt-14 border-t-[3px] border-[#191919] pt-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="font-mono text-[10px] font-black tracking-[0.16em]">DESIGNED FOR HUMAN BRAINS</div><p className="mt-1 font-display text-xl font-black">Less planning. More gentle starts.</p></div><div className="flex flex-wrap gap-2"><button onClick={() => setShowLibrary(true)} className="brutal-button bg-[#69e8c5]"><Library className="h-4 w-4" /> CURATED VIDEO RESET LIBRARY</button><button onClick={() => setShowHelp(true)} className="brutal-button bg-white"><Keyboard className="h-4 w-4" /> SHORTCUTS</button><button onClick={resetAll} className="brutal-button bg-white text-[#ff6b54]"><Trash2 className="h-4 w-4" /> CLEAR LOCAL DATA</button></div></div><div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-wide text-black/50"><span>Local first</span><span>No account</span><span>Not medical care</span><span>Started is a valid outcome</span></div></section>
      </main>

      {toastText && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 border-[3px] border-[#191919] bg-[#ff6b54] px-5 py-3 font-mono text-xs font-black shadow-[5px_5px_0_#191919]">{toastText}</div>}

      {showLibrary && <div className="modal-backdrop" onClick={() => setShowLibrary(false)}><div className="modal-panel max-w-4xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between border-b-[3px] border-[#191919] bg-[#69e8c5] p-5"><div><div className="font-mono text-[10px] font-black tracking-[0.16em]">NO RABBIT HOLES</div><h2 className="mt-2 font-display text-4xl font-black uppercase leading-none">The reset library</h2></div><button onClick={() => setShowLibrary(false)} className="icon-button bg-white"><X className="h-5 w-5" /></button></div><div className="grid gap-3 p-5 md:grid-cols-2">{VIDEO_LIBRARY.map((video) => <div key={video.url} className={`video-card ${video.color}`}><div className="flex items-start justify-between gap-3"><span className="border-[2px] border-[#191919] bg-white px-2 py-1 font-mono text-[9px] font-black">{video.tag}</span><span className="font-mono text-[10px] font-black">{video.duration}</span></div><div className="mt-10 font-display text-2xl font-black leading-[0.95]">{video.title}</div><div className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wide">{video.creator}</div><a href={video.url} target="_blank" rel="noreferrer" className="brutal-button mt-4 inline-flex bg-white">OPEN IN YOUTUBE <ExternalLink className="h-4 w-4" /></a></div>)}</div><div className="border-t-[3px] border-[#191919] bg-[#f6f2e8] p-5 font-mono text-[10px] font-bold leading-relaxed">Pick one video before you start. The point is to use the resource, not browse forever. If a video feels uncomfortable, close it and use the in-app grounding alternative.</div></div></div>}

      {showHistory && <div className="modal-backdrop" onClick={() => setShowHistory(false)}><div className="modal-panel max-w-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between border-b-[3px] border-[#191919] bg-[#a9a1ff] p-5"><div><div className="font-mono text-[10px] font-black tracking-[0.16em]">LOCAL LOG / LAST 20</div><h2 className="mt-2 font-display text-4xl font-black uppercase leading-none">Proof you showed up</h2></div><button onClick={() => setShowHistory(false)} className="icon-button bg-white"><X className="h-5 w-5" /></button></div><div className="max-h-[60vh] overflow-y-auto p-5">{history.length === 0 ? <div className="border-[3px] border-dashed border-[#191919] p-7 text-center font-mono text-sm font-bold">Nothing logged yet. Start a reset and the first line is yours.</div> : <div className="space-y-2">{history.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 border-[3px] border-[#191919] bg-white p-4"><div><div className="font-semibold">{item.action}</div><div className="mt-1 font-mono text-[10px] font-bold uppercase text-black/50">{item.date}</div></div><span className={`border-[2px] border-[#191919] px-2 py-1 font-mono text-[9px] font-black ${item.outcome === "started" ? "bg-[#69e8c5]" : item.outcome === "partial" ? "bg-[#f7d447]" : "bg-[#f6f2e8]"}`}>{item.outcome.replace("-", " ")}</span></div>)}</div>}</div></div></div>}

      {showHelp && <div className="modal-backdrop" onClick={() => setShowHelp(false)}><div className="modal-panel max-w-md" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b-[3px] border-[#191919] bg-[#f7d447] p-5"><div><div className="font-mono text-[10px] font-black tracking-[0.16em]">KEYBOARD MAP</div><h2 className="mt-2 font-display text-4xl font-black uppercase leading-none">Move faster</h2></div><button onClick={() => setShowHelp(false)} className="icon-button bg-white"><X className="h-5 w-5" /></button></div><div className="space-y-3 p-5">{[["N", "Focus capture"], ["R", "Start a reset"], ["?", "Open shortcuts"], ["ESC", "Close overlays"]].map(([key, label]) => <div key={key} className="flex items-center justify-between border-b-[2px] border-[#191919] pb-3 font-semibold"><span>{label}</span><span className="border-[2px] border-[#191919] bg-white px-2 py-1 font-mono text-xs font-black">{key}</span></div>)}<div className="pt-2 font-mono text-[10px] font-bold leading-relaxed text-black/55">TidyUp keeps the important actions reachable with one hand. Keyboard support is a speed boost, never a requirement.</div></div></div></div>}
    </div>
  );
}
