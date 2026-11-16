import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Clapperboard,
  Gift,
  Globe2,
  Heart,
  Home,
  Lightbulb,
  LockKeyhole,
  Mail,
  Menu,
  MoveRight,
  Pause,
  Play,
  Plus,
  Radio,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react';
import founderPortrait from '@/assets/images/team/Founder_Pic.jpeg';
import coFounderPortrait from '@/assets/images/team/Co_Founder_Pic.jpeg';
import ceoPortrait from '@/assets/images/team/CEO_Pic.jpeg';

type RouteKey =
  | 'home'
  | 'discover'
  | 'events'
  | 'gaming'
  | 'membership'
  | 'rewards'
  | 'about'
  | 'team'
  | 'corporate'
  | 'college'
  | 'contact'
  | 'tickets'
  | 'how-it-works'
  | 'account'
  | 'admin';

type Experience = {
  title: string;
  type: string;
  date: string;
  meta: string;
  price: string;
  image: string;
  accent: string;
};

type Movie = {
  title: string;
  category: string;
  runtime: string;
  mood: string;
  image: string;
  providers: string[];
};

const imageUrls = {
  cinema: 'https://images.pexels.com/photos/7234240/pexels-photo-7234240.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  friends: 'https://images.pexels.com/photos/9807578/pexels-photo-9807578.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  popcorn: 'https://images.pexels.com/photos/12585947/pexels-photo-12585947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  gaming: 'https://images.pexels.com/photos/7862518/pexels-photo-7862518.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  gamingDesk: 'https://images.pexels.com/photos/9072394/pexels-photo-9072394.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  theater: 'https://images.pexels.com/photos/8262664/pexels-photo-8262664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const routeLabels: Record<RouteKey, string> = {
  home: 'Home',
  discover: 'Discover',
  events: 'Experience hubs',
  gaming: 'Gaming',
  membership: 'Rewind+',
  rewards: 'Rewards',
  about: 'About us',
  team: 'Our team',
  corporate: 'Corporate',
  college: 'College',
  contact: 'Contact',
  tickets: 'Movie tickets',
  'how-it-works': 'How it works',
  account: 'My account',
  admin: 'Control room',
};

const experiences: Experience[] = [
  {
    title: 'Retro Rewind Night',
    type: 'Signature screening',
    date: 'FRI · 28 JUN',
    meta: 'The Majestic Room · Dallas',
    price: 'From $18',
    image: imageUrls.cinema,
    accent: 'yellow',
  },
  {
    title: 'Arena Zero: FC Finals',
    type: 'Gaming tournament',
    date: 'SAT · 06 JUL',
    meta: 'Level Up Arena · Dallas',
    price: '$25 entry',
    image: imageUrls.gaming,
    accent: 'blue',
  },
  {
    title: 'Friday Movie Club',
    type: 'Community session',
    date: 'FRI · 12 JUL',
    meta: 'The Commons · Dallas',
    price: '$12 member',
    image: imageUrls.friends,
    accent: 'cream',
  },
];

const movies: Movie[] = [
  {
    title: 'Afterlight',
    category: 'Atmospheric drama',
    runtime: '1h 54m',
    mood: 'Emotional',
    image: imageUrls.theater,
    providers: ['Netflix', 'Disney+', 'JioHotstar'],
  },
  {
    title: 'The Last Signal',
    category: 'Sci-fi thriller',
    runtime: '2h 08m',
    mood: 'Suspenseful',
    image: imageUrls.cinema,
    providers: ['Prime Video', 'Netflix'],
  },
  {
    title: 'Sunday Service',
    category: 'Feel-good comedy',
    runtime: '1h 42m',
    mood: 'Happy',
    image: imageUrls.friends,
    providers: ['Disney+', 'JioHotstar'],
  },
  {
    title: 'Neon District',
    category: 'Action / adventure',
    runtime: '2h 16m',
    mood: 'Excited',
    image: imageUrls.gamingDesk,
    providers: ['Prime Video', 'Netflix'],
  },
];

const tickerItems = [
  'DISCOVER THIS WEEK\'S ENTERTAINMENT',
  'RETRO REWIND NIGHT · TICKETS OPEN',
  'ARENA ZERO FINALS · REGISTRATION LIVE',
  'REWIND+ MEMBERS GET PRIORITY ACCESS',
];

const team = [
  { name: 'Monjit Singh', role: 'Founder', image: founderPortrait, bio: 'Monjit Singh sets the original vision for Blockbuster 2.0: turning entertainment discovery into a social, high-energy experience that moves from screen to real life.' },
  { name: 'Ishika Gupta', role: 'Co-Founder', image: coFounderPortrait, bio: 'Ishika Gupta shapes the customer experience around community, shared decisions and the feeling of finding a plan people actually want to join.' },
  { name: 'MD. Abid Khan', role: 'CEO', image: ceoPortrait, bio: 'MD. Abid Khan leads the proposed venture’s operating direction, building the systems and partnerships needed to make every experience feel seamless.' },
];

function getRoute(): RouteKey {
  const value = window.location.pathname.replace(/^\//, '') as RouteKey;
  return value && value in routeLabels ? value : 'home';
}

function App() {
  const [route, setRoute] = useState<RouteKey>(getRoute);
  const [mobileNav, setMobileNav] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Experience | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute());
    const handleScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setTickerIndex((current) => (current + 1) % tickerItems.length), 3600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const navigate = (nextRoute: RouteKey) => {
    const path = nextRoute === 'home' ? '/' : `/${nextRoute}`;
    window.history.pushState({}, '', path);
    setRoute(nextRoute);
  };

  const openNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3600);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5f7f9] text-[#101d35]">
      <AnnouncementBar current={tickerItems[tickerIndex]} />
      <Header route={route} onNavigate={navigate} onBack={() => { if (window.history.length > 1) window.history.back(); else navigate('home'); }} mobileNav={mobileNav} onMobileNav={() => setMobileNav((open) => !open)} />
      <main>
        {route === 'home' && <HomePage onNavigate={navigate} onEvent={setSelectedEvent} onNotice={openNotice} />}
        {route === 'discover' && <DiscoverPage onNavigate={navigate} onEvent={setSelectedEvent} onNotice={openNotice} />}
        {route === 'events' && <EventsPage onNavigate={navigate} onEvent={setSelectedEvent} />}
        {route === 'gaming' && <GamingPage onNotice={openNotice} />}
        {route === 'membership' && <MembershipPage onNotice={openNotice} />}
        {route === 'rewards' && <RewardsPage onNotice={openNotice} />}
        {route === 'about' && <AboutPage onNavigate={navigate} />}
        {route === 'team' && <TeamPage onNotice={openNotice} />}
        {route === 'corporate' && <EnquiryPage kind="corporate" onNotice={openNotice} />}
        {route === 'college' && <EnquiryPage kind="college" onNotice={openNotice} />}
        {route === 'contact' && <EnquiryPage kind="general" onNotice={openNotice} />}
        {route === 'tickets' && <TicketsPage onNotice={openNotice} />}
        {route === 'how-it-works' && <HowItWorksPage />}
        {route === 'account' && <AccountPage onNavigate={navigate} />}
        {route === 'admin' && <AdminPage onNotice={openNotice} />}
      </main>
      <Footer onNavigate={navigate} />
      {showTop && <button className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUpRight size={19} /></button>}
      {selectedEvent && <BookingModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onNotice={openNotice} />}
      {notice && <div className="notice"><BadgeCheck size={17} /> {notice}</div>}
    </div>
  );
}

function AnnouncementBar({ current }: { current: string }) {
  return (
    <div className="announcement-bar">
      <div className="eyebrow-dot"><span /> LIVE PROGRAM BOARD</div>
      <div key={current} className="ticker-copy">{current}</div>
      <div className="ticker-right"><span>Dallas pilot</span><span className="ticker-line" /><span>Updated today</span></div>
    </div>
  );
}

function Header({ route, onNavigate, onBack, mobileNav, onMobileNav }: { route: RouteKey; onNavigate: (route: RouteKey) => void; onBack: () => void; mobileNav: boolean; onMobileNav: () => void }) {
  const mainLinks: RouteKey[] = ['discover', 'events', 'gaming', 'membership', 'rewards'];
  return (
    <header className="site-header">
      <div className="header-inner">
        {route !== 'home' && <button className="back-button" onClick={onBack}><ArrowLeft size={15} /> Back</button>}
        <button className="brand" onClick={() => onNavigate('home')} aria-label="Blockbuster 2.0 home">
          <span className="brand-mark"><Clapperboard size={18} strokeWidth={2.2} /></span>
          <span><strong>BLOCKBUSTER</strong><b>2.0</b></span>
        </button>

        <span className="brand-credit">Designed By Monjit Singh</span>
        <nav className={`main-nav ${mobileNav ? 'is-open' : ''}`}>
          <button className={route === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}><Home size={15} /> Home</button>
          {mainLinks.map((link) => <button key={link} className={route === link ? 'active' : ''} onClick={() => onNavigate(link)}>{routeLabels[link]}</button>)}
          <button onClick={() => onNavigate('account')}><UserRound size={15} /> My account</button>
        </nav>
        <div className="header-actions">
          <button className="header-icon" aria-label="Open notifications" onClick={() => onNavigate('account')}><Bell size={18} /></button>
          <button className="outline-button compact" onClick={() => onNavigate('tickets')}>Book an experience <ArrowUpRight size={15} /></button>
          <button className="mobile-menu" aria-label="Toggle menu" onClick={onMobileNav}>{mobileNav ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
    </header>
  );
}

function RotatingImage({ sources, alt, className = '' }: { sources: string[]; alt: string; className?: string }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const source = sources[sourceIndex % sources.length];

  useEffect(() => {
    if (sources.length < 2) return;
    const timer = window.setInterval(() => setSourceIndex((current) => (current + 1) % sources.length), 5200);
    return () => window.clearInterval(timer);
  }, [sources.length]);

  return <img key={source} className={`rotating-image ${className}`} src={source} alt={alt} />;
}

function RotatingBackground({ sources }: { sources: string[] }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const source = sources[sourceIndex % sources.length];

  useEffect(() => {
    const timer = window.setInterval(() => setSourceIndex((current) => (current + 1) % sources.length), 5600);
    return () => window.clearInterval(timer);
  }, [sources.length]);

  return <div key={source} className="hero-background" style={{ backgroundImage: `url(${source})` }} />;
}

function AnimatedHeroHeadline() {
  const lines = [['Entertainment', 'is', 'better'], ['When', 'we', 'experience', 'it', 'together.']];
  const totalWords = lines.reduce((total, line) => total + line.length, 0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    let timer: number;
    if (phase === 'enter' && visibleCount < totalWords) {
      timer = window.setTimeout(() => setVisibleCount((current) => current + 1), 260);
    } else if (phase === 'enter') {
      timer = window.setTimeout(() => setPhase('hold'), 1500);
    } else if (phase === 'hold') {
      timer = window.setTimeout(() => setPhase('exit'), 1900);
    } else if (visibleCount > 0) {
      timer = window.setTimeout(() => setVisibleCount((current) => current - 1), 135);
    } else {
      timer = window.setTimeout(() => setPhase('enter'), 650);
    }
    return () => window.clearTimeout(timer);
  }, [phase, totalWords, visibleCount]);

  return <h1 className="animated-headline" aria-label="Entertainment is better When we experience it    together.">{lines.map((line, lineIndex) => {
    const offset = lines.slice(0, lineIndex).reduce((total, currentLine) => total + currentLine.length, 0);
    return <span className="headline-line" key={line.join('-')}>{line.map((word, wordIndex) => <span className={`hero-word ${word === 'together.' ? 'accent' : ''} ${offset + wordIndex < visibleCount ? 'is-visible' : ''}`} key={word}>{word}</span>)}</span>;
  })}</h1>; 
}

function HomePage({ onNavigate, onEvent, onNotice }: { onNavigate: (route: RouteKey) => void; onEvent: (event: Experience) => void; onNotice: (message: string) => void }) {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <>
      <section className="hero-section">
        <RotatingBackground sources={[imageUrls.cinema, imageUrls.theater, imageUrls.friends, imageUrls.popcorn]} />
        <div className="hero-glow" />
        <div className="hero-content page-shell">
          <div className="hero-copy">
            <div className="live-chip"><span className="live-pulse" /> Experience platform · live preview</div>
            <p className="hero-kicker">DISCOVER · CONNECT · EXPERIENCE · REPEAT</p>
            <AnimatedHeroHeadline />
            <p className="hero-text">Find what is worth watching, book plans worth leaving the house for, and keep every shared moment in one place.</p>
            <div className="hero-buttons">
              <button className="yellow-button" onClick={() => onNavigate('discover')}>Explore entertainment <ArrowRight size={17} /></button>
              <button className="ghost-button" onClick={() => onNavigate('events')}>See what’s on <Play size={15} fill="currentColor" /></button>
            </div>
            <div className="hero-meta"><span><ShieldCheck size={15} /> Partner-ready discovery</span><span><Globe2 size={15} /> Region-aware listings</span></div>
          </div>
          <div className="hero-dashboard">
            <div className="dashboard-head"><div><span className="tiny-label">LIVE COMMAND CENTER</span><strong>Tonight on the platform</strong></div><button onClick={() => setIsPaused((paused) => !paused)} className="round-control" aria-label={isPaused ? 'Play pulse' : 'Pause pulse'}>{isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} />}</button></div>
            <div className="pulse-panel"><div className="pulse-title"><Radio size={15} /> Platform pulse <span>steady</span></div><div className={`pulse-bars ${isPaused ? 'paused' : ''}`}>{Array.from({ length: 30 }).map((_, index) => <i key={index} style={{ height: `${20 + ((index * 17) % 66)}%` }} />)}</div><div className="pulse-foot"><span>Discovery rooms open</span><b>24</b></div></div>
            <div className="hero-dashboard-grid"><div><span className="tiny-label">NEXT EXPERIENCE</span><strong>Retro Rewind Night</strong><small>Doors in <b>04d 08h 22m</b></small></div><div className="dashboard-date">28<span>JUN</span></div></div>
            <div className="status-row"><span className="status-dot" /> Booking window active <span className="status-arrow"><ArrowUpRight size={14} /></span></div>
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll to explore</span><div /></div>
      </section>
      <section className="section section-white live-section"><div className="page-shell"><SectionIntro eyebrow="THE BLOCKBUSTER SIGNAL" title="A clearer way to find your next plan." copy="One connected place for the thing you want to watch, the people you want to bring, and the memory you want to make." action="See how it works" onClick={() => onNavigate('how-it-works')} /><div className="signal-grid"><SignalCard icon={Compass} eyebrow="01 / DISCOVER" title="The right watch, faster" copy="Filter by mood, genre, language or who is holding the remote." image={imageUrls.theater} onClick={() => onNavigate('discover')} /><SignalCard icon={Ticket} eyebrow="02 / EXPERIENCE" title="Plans with a pulse" copy="Curated screenings, clubs, campus nights and competitive play." image={imageUrls.friends} onClick={() => onNavigate('events')} /><SignalCard icon={Gift} eyebrow="03 / REWARDS" title="Good choices come back" copy="Earn points as you show up, bring friends and come back again." image={imageUrls.popcorn} onClick={() => onNavigate('rewards')} /></div></div></section>
      <section className="section dark-section"><div className="page-shell"><div className="section-heading-row"><SectionIntro dark eyebrow="LIVE AVAILABILITY GUIDE" title="Find it. Queue it. Share it." copy="A clean view across the services people already use. Provider listings are region-dependent and always open at the source." /><button className="text-link light-link" onClick={() => onNavigate('discover')}>Open discovery <ArrowRight size={16} /></button></div><div className="movie-rail">{movies.map((movie) => <MovieCard key={movie.title} movie={movie} onNotice={onNotice} />)}</div><div className="provider-note"><span><ShieldCheck size={16} /> Provider-directed links</span><span>Netflix</span><span>Prime Video</span><span>Disney+</span><span>JioHotstar</span><span className="provider-note-end">Region &amp; catalogue dependent</span></div></div></section>
      <section className="section event-section"><div className="page-shell"><SectionIntro eyebrow="THE EXPERIENCE HUB" title="The next good night is already on the calendar." copy="From throwback screenings to bracket finals, pick an experience that gives people a reason to show up." action="View all experiences" onClick={() => onNavigate('events')} /><div className="event-grid">{experiences.map((event) => <ExperienceCard key={event.title} event={event} onClick={() => onEvent(event)} />)}</div></div></section>
      <section className="section split-section"><div className="page-shell split-layout"><div className="split-visual"><RotatingImage sources={[imageUrls.gamingDesk, imageUrls.gaming, imageUrls.cinema]} alt="Neon-lit gaming stations ready for a tournament" /><div className="visual-caption"><span className="live-pulse" /> Arena Zero registration <b>OPEN</b></div></div><div className="split-copy"><p className="eyebrow">NOT JUST A WATCHLIST</p><h2>Bring the room into the room.</h2><p>Make the decision together, then turn the plan into something real. Create a movie room, invite your people and let the group decide.</p><div className="feature-list"><span><UsersRound size={18} /> Group voting rooms</span><span><CalendarDays size={18} /> Events that feel considered</span><span><WalletCards size={18} /> Rewards that follow you</span></div><button className="dark-button" onClick={() => onNavigate('discover')}>Start a group room <MoveRight size={16} /></button></div></div></section>
      <section className="section team-section"><div className="page-shell"><div className="section-heading-row"><SectionIntro eyebrow="THE PEOPLE BEHIND THE PULSE" title="Built by people who care about the plan." copy="A proposed entertainment venture led with a simple belief: shared time should feel worth it." /><button className="text-link" onClick={() => onNavigate('team')}>Meet the team <ArrowRight size={16} /></button></div><div className="team-grid">{team.map((person) => <TeamCard key={person.name} person={person} />)}</div></div></section>
      <section className="cta-section"><div className="page-shell cta-inner"><div><p className="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</p><h2>Make the group chat<br /><em>worth opening.</em></h2></div><div className="cta-actions"><button className="yellow-button" onClick={() => onNavigate('events')}>Explore events <ArrowRight size={17} /></button><button className="outline-button light-outline" onClick={() => onNavigate('membership')}>Join Rewind+ <Sparkles size={16} /></button></div></div></section>
      <section className="legal-strip"><div className="page-shell"><ShieldCheck size={17} /><span>Blockbuster 2.0 is a proposed new venture. Commercial use of the Blockbuster name and related marks is subject to appropriate permissions. No official affiliation is implied.</span><button onClick={() => onNavigate('about')}>Read our story <ArrowRight size={14} /></button></div></section>
    </>
  );
}

function SectionIntro({ eyebrow, title, copy, action, onClick, dark = false }: { eyebrow: string; title: string; copy: string; action?: string; onClick?: () => void; dark?: boolean }) {
  return <div className={`section-intro ${dark ? 'dark-intro' : ''}`}><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><div className="intro-side"><p>{copy}</p>{action && <button className="text-link" onClick={onClick}>{action} <ArrowRight size={16} /></button>}</div></div>;
}

function SignalCard({ icon: Icon, eyebrow, title, copy, image, onClick }: { icon: LucideIcon; eyebrow: string; title: string; copy: string; image: string; onClick: () => void }) {
  return <article className="signal-card"><div className="signal-image"><RotatingImage sources={[image, imageUrls.cinema, imageUrls.gamingDesk]} alt="" /><span className="signal-icon"><Icon size={18} /></span></div><div className="signal-copy"><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{copy}</p><button className="card-link" onClick={onClick}>Explore <ArrowUpRight size={15} /></button></div></article>;
}

function MovieCard({ movie, onNotice }: { movie: Movie; onNotice: (message: string) => void }) {
  const [saved, setSaved] = useState(false);
  return <article className="movie-card"><div className="movie-image"><RotatingImage sources={[movie.image, imageUrls.cinema, imageUrls.friends, imageUrls.theater]} alt={`${movie.title} atmosphere`} /><span className="movie-tag">EDITORIAL PICK</span><button className={`save-button ${saved ? 'saved' : ''}`} onClick={() => { setSaved((current) => !current); onNotice(saved ? 'Removed from your watchlist' : 'Added to your watchlist'); }} aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}><Heart size={16} fill={saved ? 'currentColor' : 'none'} /></button></div><div className="movie-content"><div className="movie-title-row"><h3>{movie.title}</h3><span>{movie.runtime}</span></div><p>{movie.category} · {movie.mood}</p><div className="provider-pills">{movie.providers.map((provider) => <span key={provider}>{provider}</span>)}</div><button className="movie-action" onClick={() => onNotice(`${movie.title} provider guide opened`)}>View provider guide <ArrowUpRight size={14} /></button></div></article>;
}

function ExperienceCard({ event, onClick }: { event: Experience; onClick: () => void }) {
  return <article className="experience-card"><div className="experience-image"><RotatingImage sources={[event.image, imageUrls.cinema, imageUrls.gaming, imageUrls.popcorn]} alt="" /><span className={`experience-accent ${event.accent}`} /></div><div className="experience-body"><div className="date-block"><strong>{event.date.split(' · ')[1]?.slice(0, 2)}</strong><span>{event.date.split(' · ')[1]?.slice(2)}</span></div><div><p className="eyebrow">{event.type}</p><h3>{event.title}</h3><p className="muted-line">{event.meta}</p><div className="experience-footer"><b>{event.price}</b><button onClick={onClick}>Book now <ArrowUpRight size={14} /></button></div></div></div></article>;
}

function TeamCard({ person }: { person: { name: string; role: string; image: string; bio: string } }) {
  return <article className="team-card"><div className="portrait-wrap"><img src={person.image} alt={`${person.name}, ${person.role}`} /><span className="portrait-index">0{team.findIndex((member) => member.name === person.name) + 1}</span></div><div className="team-card-copy"><p className="eyebrow">{person.role}</p><h3>{person.name}</h3><p>{person.bio}</p></div></article>;
}

function DiscoverPage({ onNavigate, onEvent, onNotice }: { onNavigate: (route: RouteKey) => void; onEvent: (event: Experience) => void; onNotice: (message: string) => void }) {
  const [query, setQuery] = useState('');
  const [mood, setMood] = useState('All moods');
  const [roomCreated, setRoomCreated] = useState(false);
  const moods = ['All moods', 'Happy', 'Emotional', 'Excited', 'Suspenseful', 'Relaxed'];
  const filtered = useMemo(() => movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()) && (mood === 'All moods' || movie.mood === mood)), [query, mood]);
  return <><PageHero eyebrow="BLOCKBUSTER DISCOVER" title={<>What do you feel like <em>watching?</em></>} copy="A smarter starting point for movie night. Find a signal, save a pick, or make the group decide." image={imageUrls.friends} /><section className="section discover-section"><div className="page-shell"><div className="discover-tools"><div className="search-box"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a title, mood or genre" /><kbd>⌘ K</kbd></div><button className="filter-button"><Settings2 size={16} /> More filters <ChevronDown size={15} /></button></div><div className="mood-row"><span className="tiny-label">TUNE THE FEELING</span>{moods.map((item) => <button key={item} className={mood === item ? 'selected' : ''} onClick={() => setMood(item)}>{item}</button>)}</div><div className="discover-heading"><div><p className="eyebrow">CURATED FOR THE ROOM</p><h2>{filtered.length} picks with a pulse.</h2></div><span className="muted-line">Provider links vary by region</span></div><div className="discover-grid">{filtered.map((movie) => <MovieCard key={movie.title} movie={movie} onNotice={onNotice} />)}</div>{filtered.length === 0 && <div className="empty-state"><Search size={28} /><h3>No picks match that feeling yet.</h3><p>Try a wider mood or another title.</p></div>}<div className="group-room"><div><span className="room-icon"><UsersRound size={20} /></span><p className="eyebrow">SIGNATURE FEATURE</p><h2>Let the group decide.</h2><p>Create a room, send the code and turn “what should we watch?” into a five-minute vote.</p></div>{roomCreated ? <div className="room-code"><span>ROOM READY</span><strong>REWIND-24</strong><small>Share this code with your people</small><button onClick={() => onNotice('Room invite copied')}>Copy invite <ArrowUpRight size={14} /></button></div> : <button className="yellow-button" onClick={() => setRoomCreated(true)}>Create a movie room <Plus size={16} /></button>}</div></div></section><section className="section light-blue-section"><div className="page-shell"><SectionIntro eyebrow="NEXT ON THE CALENDAR" title="A reason to leave the house." copy="Curated events are where the platform becomes a real place. Find your next one." action="Browse events" onClick={() => onNavigate('events')} /><div className="event-grid two-up">{experiences.slice(0, 2).map((event) => <ExperienceCard key={event.title} event={event} onClick={() => onEvent(event)} />)}</div></div></section></>;
}

function EventsPage({ onNavigate, onEvent }: { onNavigate: (route: RouteKey) => void; onEvent: (event: Experience) => void }) {
  const [active, setActive] = useState('All experiences');
  const filters = ['All experiences', 'Screenings', 'Gaming', 'Community'];
  const filtered = experiences.filter((event) => active === 'All experiences' || (active === 'Gaming' ? event.type.includes('Gaming') : active === 'Community' ? event.type.includes('Community') : active === 'Screenings' ? event.type.includes('screening') : true));
  return <><PageHero eyebrow="EXPERIENCE HUBS" title={<>More than movies.<br /><em>More to remember.</em></>} copy="A considered calendar of screenings, gaming nights and the spaces in between." image={imageUrls.popcorn} /><section className="section"><div className="page-shell"><div className="filter-tabs">{filters.map((filter) => <button key={filter} className={active === filter ? 'active' : ''} onClick={() => setActive(filter)}>{filter}</button>)}</div><div className="event-grid">{filtered.map((event) => <ExperienceCard key={event.title} event={event} onClick={() => onEvent(event)} />)}</div><div className="experience-feature"><div><p className="eyebrow">FOR THE PEOPLE MAKING THE PLAN</p><h2>Bring Blockbuster to your campus or company.</h2><p>Design a night around your people, your place and your version of a good time.</p></div><div className="feature-actions"><button className="dark-button" onClick={() => onNavigate('college')}>College partnerships <ArrowRight size={16} /></button><button className="outline-button" onClick={() => onNavigate('corporate')}>Corporate events <ArrowRight size={16} /></button></div></div></div></section></>;
}

function GamingPage({ onNotice }: { onNotice: (message: string) => void }) {
  const [registered, setRegistered] = useState(false);
  return <><PageHero eyebrow="ARENA ZERO" title={<>Play. Compete.<br /><em>Win together.</em></>} copy="A sharper home for tournaments, team energy and the kind of bragging rights that last." image={imageUrls.gaming} /><section className="section"><div className="page-shell gaming-layout"><div className="gaming-main"><div className="section-heading-row compact-heading"><SectionIntro eyebrow="REGISTRATION WINDOW" title="The bracket is forming." copy="Real tournament details belong in the control room. This live-ready interface keeps every stage visible." /><span className="live-badge"><span className="live-pulse" /> Open</span></div><div className="tournament-card"><div className="tournament-image"><RotatingImage sources={[imageUrls.gamingDesk, imageUrls.gaming, imageUrls.cinema]} alt="Competitive gaming setup" /><span>FC FINALS / 06 JUL</span></div><div className="tournament-info"><div><p className="eyebrow">DALLAS · LEVEL UP ARENA</p><h2>Arena Zero: FC Finals</h2><p>Solo bracket · 64 player capacity · $1,500 prize pool</p></div><div className="tournament-stats"><span><strong>42</strong> spots remaining</span><span><strong>04d</strong> registration window</span><span><strong>$25</strong> entry</span></div><button className="yellow-button" onClick={() => { setRegistered(true); onNotice('Your tournament interest has been recorded'); }}>{registered ? <><Check size={16} /> Interest recorded</> : <>Register interest <ArrowRight size={16} /></>}</button></div></div></div><aside className="bracket-card"><div className="bracket-head"><span className="tiny-label">LIVE BOARD</span><Radio size={16} /></div><h3>Matchday flow</h3><div className="bracket-step done"><b>01</b><span>Registration<small>Open now</small></span><Check size={15} /></div><div className="bracket-step active"><b>02</b><span>Seeding<small>06 Jul · 10:00</small></span><span className="step-dot" /></div><div className="bracket-step"><b>03</b><span>Finals<small>06 Jul · 18:00</small></span></div><div className="bracket-note"><Trophy size={16} /> Standings update after each verified match.</div></aside></div></section></>;
}

function MembershipPage({ onNotice }: { onNotice: (message: string) => void }) {
  const [selected, setSelected] = useState('Rewind+ Individual');
  const plans = [{ name: 'Discovery', price: '$0', detail: 'A clean start', items: ['Movie discovery', 'Watchlists', 'Group voting'] }, { name: 'Rewind+ Individual', price: '$9.99', detail: 'For the regulars', items: ['Priority event access', 'Eligible event perks', 'Rewards multiplier'] }, { name: 'Rewind+ Household', price: '$16.99', detail: 'For the whole room', items: ['Shared privileges', 'Family-first offers', 'Priority event access'] }];
  return <><PageHero eyebrow="REWIND+ MEMBERSHIP" title={<>Experiences are better<br /><em>when you belong.</em></>} copy="More access, a little more welcome, and rewards that make coming back feel good." image={imageUrls.theater} /><section className="section membership-section"><div className="page-shell"><div className="membership-intro"><div><p className="eyebrow">CHOOSE YOUR RHYTHM</p><h2>Keep your seat<br />at the table.</h2></div><p>Start free. Move up when the calendar starts filling up. Cancel or change your plan when the season changes.</p></div><div className="plans-grid">{plans.map((plan, index) => <article key={plan.name} className={`plan-card ${selected === plan.name ? 'selected' : ''} ${index === 1 ? 'featured' : ''}`} onClick={() => setSelected(plan.name)}><div className="plan-top"><span className="plan-number">0{index + 1}</span>{index === 1 && <span className="popular-label">MOST POPULAR</span>}</div><p className="eyebrow">{plan.detail}</p><h3>{plan.name}</h3><div className="plan-price">{plan.price}<small>{index === 0 ? '' : '/ month'}</small></div><div className="plan-divider" />{plan.items.map((item) => <span className="plan-item" key={item}><Check size={15} /> {item}</span>)}<button className={selected === plan.name ? 'dark-button' : 'outline-button'} onClick={() => { setSelected(plan.name); onNotice(`${plan.name} selected`); }}>{selected === plan.name ? <>Selected <Check size={15} /></> : <>Choose plan <ArrowRight size={15} /></>}</button></article>)}</div></div></section></>;
}

function RewardsPage({ onNotice }: { onNotice: (message: string) => void }) {
  const [points, setPoints] = useState(320);
  const discount = Math.floor(points / 100);
  return <><PageHero eyebrow="REWIND REWARDS" title={<>Book more. Earn more.<br /><em>Experience more.</em></>} copy="A simple wallet for the moments you choose to come back for." image={imageUrls.friends} /><section className="section rewards-section"><div className="page-shell"><div className="wallet-hero"><div><span className="tiny-label">AVAILABLE BALANCE</span><div className="points-value">1,280 <small>pts</small></div><p><span className="status-dot" /> On track for a $15 experience credit</p></div><div className="wallet-art"><Gift size={54} strokeWidth={1.1} /><span>REWIND<br />WALLET</span></div></div><div className="rewards-layout"><div className="redeem-card"><div className="card-topline"><span className="eyebrow">AT CHECKOUT</span><span>100 pts = $1</span></div><h2>Use your points<br />on the next plan.</h2><p>Choose how much of your wallet to apply. The limit is always shown before you confirm.</p><input className="points-slider" type="range" min="0" max="500" step="100" value={points} onChange={(event) => setPoints(Number(event.target.value))} /><div className="slider-labels"><span>0 pts</span><strong>{points} pts</strong><span>500 pts</span></div><div className="redeem-total"><span>Experience credit</span><b>-${discount}.00</b></div><button className="yellow-button" onClick={() => onNotice(`$${discount}.00 wallet credit ready for checkout`)}>Apply at checkout <ArrowRight size={16} /></button></div><div className="rewards-history"><div className="card-topline"><span className="eyebrow">RECENT ACTIVITY</span><button className="small-link">View all <ArrowRight size={14} /></button></div>{[['Retro Rewind waitlist', '+120 pts', 'Today'], ['Referral thank-you', '+250 pts', '12 Jun'], ['Movie Club booking', '+80 pts', '07 Jun'], ['Wallet redemption', '-300 pts', '01 Jun']].map(([name, amount, date]) => <div className="history-row" key={name}><span className="history-icon"><Sparkles size={15} /></span><div><strong>{name}</strong><small>{date}</small></div><b className={amount.startsWith('-') ? 'negative' : ''}>{amount}</b></div>)}</div></div></div></section></>;
}

function PageHero({ eyebrow, title, copy, image, rotate = true }: { eyebrow: string; title: JSX.Element; copy: string; image: string; rotate?: boolean }) {
  return <section className="page-hero"><div className="page-shell page-hero-inner"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div><div className="page-hero-image">{rotate ? <RotatingImage sources={[image, imageUrls.cinema, imageUrls.friends, imageUrls.gaming]} alt="" /> : <img src={image} alt="" />}<span className="hero-image-label"><span className="live-pulse" /> The signal is on</span></div></div></section>;
}

function AboutPage({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  return <><PageHero eyebrow="OUR POINT OF VIEW" title={<>Reimagining entertainment<br /><em>for a new generation.</em></>} copy="We are not bringing back the old rental business. We are rebuilding the way people discover, connect and experience entertainment." image={imageUrls.cinema} /><section className="section"><div className="page-shell story-layout"><div className="story-statement"><p className="eyebrow">THE PROPOSITION</p><h2>Less scrolling alone.<br /><em>More showing up.</em></h2></div><div className="story-copy"><p>Blockbuster 2.0 is a proposed entertainment discovery and experiences venture. The idea is simple: digital convenience should lead somewhere human.</p><p>Our model connects movie discovery, shared decisions, real-world experiences, memberships and rewards into one calm, connected customer journey.</p><div className="mission-card"><span><Lightbulb size={19} /></span><div><p className="eyebrow">OUR MISSION</p><strong>To connect people through accessible entertainment discovery, memorable shared experiences and a rewarding community.</strong></div></div></div></div></section><section className="section light-blue-section"><div className="page-shell"><SectionIntro eyebrow="FOUR CONNECTED PILLARS" title="One platform, different ways to belong." copy="Designed to flex from a Friday plan to a full campus partnership." /><div className="pillar-grid">{[['DISCOVER', 'Find the right thing to watch.', Compass], ['EXPERIENCE', 'Make the plan feel special.', Ticket], ['REWIND+', 'Come back with more access.', Sparkles], ['PARTNERS', 'Build better nights together.', UsersRound]].map(([title, text, Icon]) => <div className="pillar" key={title as string}><span><Icon size={19} /></span><p className="eyebrow">{title as string}</p><h3>{text as string}</h3><ArrowUpRight size={16} /></div>)}</div></div></section><section className="section"><div className="page-shell disclaimer"><ShieldCheck size={22} /><div><p className="eyebrow">IMPORTANT CONTEXT</p><h3>Proposed venture. Clear about what comes next.</h3><p>Commercial use of the Blockbuster name and related marks is conditional on obtaining appropriate trademark licensing and intellectual-property permissions. No official affiliation is implied.</p><button className="text-link" onClick={() => onNavigate('contact')}>Start a conversation <ArrowRight size={16} /></button></div></div></section></>;
}

function TeamPage({ onNotice }: { onNotice: (message: string) => void }) {
  return <><PageHero eyebrow="OUR FOUNDERS & LEADERSHIP" title={<>The people behind<br /><em>the next chapter.</em></>} copy="A proposed venture shaped by a belief that entertainment works best when it creates a reason to gather." image={founderPortrait} rotate={false} /><section className="section"><div className="page-shell team-page-grid">{team.map((person) => <article className="team-profile" key={person.name}><div className="team-profile-image"><img src={person.image} alt={`${person.name}, ${person.role}`} /><span>BLOCKBUSTER 2.0</span></div><div className="team-profile-copy"><p className="eyebrow">{person.role}</p><h2>{person.name}</h2><p>{person.bio}</p><button className="outline-button" onClick={() => onNotice(`Profile note for ${person.name} is ready for review`)}>Profile note <ArrowUpRight size={15} /></button></div></article>)}</div></section></>;
}

function EnquiryPage({ kind, onNotice }: { kind: 'corporate' | 'college' | 'general'; onNotice: (message: string) => void }) {
  const [sent, setSent] = useState(false);
  const content = kind === 'corporate' ? { eyebrow: 'CORPORATE ENTERTAINMENT', title: <>Make engagement<br /><em>more entertaining.</em></>, copy: 'Private screenings, team tournaments and experiences designed around your people.' } : kind === 'college' ? { eyebrow: 'COLLEGE EVENTS', title: <>Bring the feeling<br /><em>to campus.</em></>, copy: 'Give students a reason to gather with movie nights, gaming competitions and custom festivals.' } : { eyebrow: 'CONTACT THE STUDIO', title: <>Let’s create something<br /><em>worth showing up for.</em></>, copy: 'Tell us what you are planning. We will help shape the next move.' };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); onNotice('Enquiry received · reference BB-2048'); };
  return <><PageHero eyebrow={content.eyebrow} title={content.title} copy={content.copy} image={kind === 'college' ? imageUrls.gaming : imageUrls.friends} /><section className="section"><div className="page-shell enquiry-layout"><div className="enquiry-side"><p className="eyebrow">{kind === 'general' ? 'THE DOOR IS OPEN' : 'LET’S DESIGN THE NIGHT'}</p><h2>Good plans start with a clear first message.</h2><p>Share the shape of what you need. This is a proposal-ready enquiry flow, designed for a thoughtful follow-up.</p><div className="contact-points"><span><Mail size={16} /> hello@blockbuster20.com</span><span><Globe2 size={16} /> Dallas pilot · region-ready</span><span><Clock3 size={16} /> Reply window · 1–2 business days</span></div></div><div className="form-card">{sent ? <div className="form-success"><span><Check size={25} /></span><p className="eyebrow">MESSAGE RECEIVED</p><h2>We have the signal.</h2><p>Your enquiry reference is <strong>BB-2048</strong>. A member of the studio team will pick it up next.</p><button className="dark-button" onClick={() => setSent(false)}>Send another message <ArrowRight size={15} /></button></div> : <form onSubmit={submit}><div className="form-header"><span className="tiny-label">ENQUIRY / {kind.toUpperCase()}</span><LockKeyhole size={16} /></div><div className="form-grid"><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@company.com" /></label><label>Phone<input placeholder="Optional" /></label><label>Preferred date<input type="date" /></label></div><label>What are you planning?<select defaultValue=""><option value="" disabled>Select an experience type</option><option>Private screening</option><option>Gaming tournament</option><option>Campus festival</option><option>Partnership conversation</option></select></label><label>Tell us a little more<textarea required rows={4} placeholder="Audience, location, ambition..."></textarea></label><label className="checkbox-label"><input type="checkbox" required /> I agree to be contacted about this enquiry.</label><button className="yellow-button" type="submit">Send enquiry <Send size={16} /></button></form>}</div></div></section></>;
}

function TicketsPage({ onNotice }: { onNotice: (message: string) => void }) {
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const total = quantity * 18;
  return <><PageHero eyebrow="MOVIE TICKETS" title={<>Your next movie experience<br /><em>is just a booking away.</em></>} copy="A clear, calm booking flow for Blockbuster-organised screenings and events." image={imageUrls.theater} /><section className="section"><div className="page-shell booking-layout"><div className="screening-card"><div className="screening-image"><RotatingImage sources={[imageUrls.cinema, imageUrls.theater, imageUrls.friends]} alt="Cinema seats waiting for a screening" /><span>BLOCKBUSTER ORGANIZED</span></div><div className="screening-info"><p className="eyebrow">FRI · 28 JUN · 7:30 PM</p><h2>Retro Rewind Night</h2><p>The Majestic Room · Dallas</p><div className="screening-perks"><span><Ticket size={15} /> Digital QR ticket</span><span><Gift size={15} /> Earn up to 180 pts</span><span><ShieldCheck size={15} /> Secure checkout</span></div></div></div><div className="booking-card">{confirmed ? <div className="ticket-success"><div className="qr-code">{Array.from({ length: 49 }).map((_, index) => <i key={index} className={index % 3 === 0 || index % 7 === 0 ? 'on' : ''} />)}</div><p className="eyebrow">BOOKING CONFIRMED</p><h2>See you in the room.</h2><p>Your digital ticket for Retro Rewind Night is ready. Confirmation <strong>BB-7284</strong></p><button className="outline-button" onClick={() => onNotice('Ticket added to your account')}>Add to account <ArrowRight size={15} /></button></div> : <><div className="booking-head"><span className="eyebrow">YOUR BOOKING</span><span className="secure-label"><LockKeyhole size={13} /> Secure</span></div><div className="quantity-row"><div><strong>General admission</strong><small>Includes screening + club access</small></div><div className="quantity-control"><button onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button><b>{quantity}</b><button onClick={() => setQuantity((current) => Math.min(8, current + 1))}>+</button></div></div><div className="booking-line"><span>Tickets × {quantity}</span><b>${total}.00</b></div><div className="booking-line muted"><span>Rewind wallet</span><b>Applied at checkout</b></div><div className="booking-total"><span>Total before payment</span><strong>${total}.00</strong></div><button className="yellow-button full-button" onClick={() => { setConfirmed(true); onNotice('Booking confirmed · QR ticket generated'); }}>Continue to secure payment <ArrowRight size={16} /></button><p className="fine-print">You will only be charged after payment confirmation. Cancellation terms are shown before final payment.</p></>}</div></div></section></>;
}

function HowItWorksPage() {
  const steps = [{ number: '01', title: 'Discover entertainment', copy: 'Search by feeling, genre, language or the people you are planning with.', icon: Compass }, { number: '02', title: 'Make the plan', copy: 'Create a group room, vote together or choose an experience already on the calendar.', icon: UsersRound }, { number: '03', title: 'Book with clarity', copy: 'See what is included, what it costs and where your points can help before you confirm.', icon: Ticket }, { number: '04', title: 'Show up & earn', copy: 'Your ticket, updates and eligible rewards stay together after the night is over.', icon: Sparkles }];
  return <><PageHero eyebrow="HOW IT WORKS" title={<>From “what should we do?”<br /><em>to “that was so good.”</em></>} copy="A straightforward journey for finding the feeling, making the plan and coming back for more." image={imageUrls.popcorn} /><section className="section"><div className="page-shell steps-grid">{steps.map(({ number, title, copy, icon: Icon }) => <article className="step-card" key={number}><span className="step-number">{number}</span><Icon size={22} /><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={16} /></article>)}</div></section><section className="section dark-section"><div className="page-shell journey-banner"><div><p className="eyebrow">THE CUSTOMER JOURNEY</p><h2>Less friction between<br /><em>feeling it and living it.</em></h2></div><div className="journey-line"><span>Discover</span><i /><span>Decide</span><i /><span>Book</span><i /><span>Return</span></div></div></section></>;
}

function AccountPage({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  return <><section className="account-hero"><div className="page-shell account-hero-inner"><div><div className="live-chip dark-chip"><span className="live-pulse" /> MEMBER SPACE</div><p className="eyebrow">WELCOME BACK, MONJIT</p><h1>Your next good idea<br /><em>is already moving.</em></h1></div><div className="account-avatar">MS</div></div></section><section className="section account-section"><div className="page-shell"><div className="account-grid"><div className="account-card wallet-card"><div className="card-topline"><span className="eyebrow">REWIND WALLET</span><WalletCards size={18} /></div><strong>1,280 <small>points</small></strong><p>+450 points this month</p><button className="small-link" onClick={() => onNavigate('rewards')}>Open rewards <ArrowRight size={14} /></button></div><div className="account-card booking-overview"><div className="card-topline"><span className="eyebrow">UP NEXT</span><CalendarDays size={18} /></div><h3>Retro Rewind Night</h3><p>Fri · 28 Jun · The Majestic Room</p><div className="booking-status"><span className="status-dot" /> Confirmed <span>BB-7284</span></div></div><div className="account-card profile-card"><div className="card-topline"><span className="eyebrow">YOUR PROFILE</span><UserRound size={18} /></div><h3>Monjit Singh</h3><p>Dallas · Discovery member</p><button className="small-link">Manage profile <ArrowRight size={14} /></button></div></div><div className="account-table"><div className="card-topline"><span className="eyebrow">RECENT ACTIVITY</span><button className="small-link">View history <ArrowRight size={14} /></button></div>{[['Booking confirmed', 'Retro Rewind Night', 'Today', Check], ['Reward points added', 'Referral thank-you', '12 Jun', Gift], ['Watchlist updated', 'Afterlight', '09 Jun', Heart]].map(([title, detail, date, Icon]) => <div className="activity-row" key={title as string}><span className="activity-icon"><Icon size={16} /></span><div><strong>{title as string}</strong><small>{detail as string}</small></div><span>{date as string}</span><ChevronRight size={15} /></div>)}</div></div></section></>;
}

function AdminPage({ onNotice }: { onNotice: (message: string) => void }) {
  return <><section className="admin-hero"><div className="page-shell"><div className="admin-head"><div><div className="live-chip dark-chip"><span className="live-pulse" /> CONTROL ROOM</div><h1>The experience<br /><em>behind the experience.</em></h1><p>Operational view for events, enquiries and the next signal.</p></div><button className="yellow-button" onClick={() => onNotice('New experience draft opened')}>Create experience <Plus size={16} /></button></div></div></section><section className="section admin-section"><div className="page-shell"><div className="admin-metrics"><div><span className="eyebrow">ACTIVE EXPERIENCES</span><strong>03</strong><small>+1 this month</small></div><div><span className="eyebrow">OPEN ENQUIRIES</span><strong>12</strong><small>4 need a reply</small></div><div><span className="eyebrow">MEMBER SIGNAL</span><strong>78%</strong><small>return intent</small></div><div><span className="eyebrow">REWARD LIABILITY</span><strong>18.4k</strong><small>points in circulation</small></div></div><div className="admin-columns"><div className="admin-panel"><div className="panel-head"><div><p className="eyebrow">PROGRAM BOARD</p><h2>What is moving now</h2></div><button className="small-link">Manage board <ArrowRight size={14} /></button></div>{experiences.map((event) => <div className="program-row" key={event.title}><span className="program-status"><span className="status-dot" /> Live</span><div><strong>{event.title}</strong><small>{event.date} · {event.meta}</small></div><b>{event.price}</b><ChevronRight size={15} /></div>)}</div><div className="admin-panel"><div className="panel-head"><div><p className="eyebrow">SIGNAL CHECK</p><h2>System readiness</h2></div><BadgeCheck size={18} className="ready-icon" /></div>{[['Movie metadata', 'Connected'], ['Provider availability', 'Region-ready'], ['Payments', 'Sandbox-ready'], ['Customer auth', 'Ready for setup']].map(([label, value]) => <div className="readiness-row" key={label}><span>{label}</span><b><span className="status-dot" /> {value}</b></div>)}<div className="admin-note"><CircleHelp size={15} /> External providers remain subject to their own terms and permissions.</div></div></div></div></section></>;
}

function BookingModal({ event, onClose, onNotice }: { event: Experience; onClose: () => void; onNotice: (message: string) => void }) {
  const [quantity, setQuantity] = useState(1);
  return <div className="modal-backdrop" onClick={onClose}><div className="booking-modal" onClick={(eventClick) => eventClick.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close booking"><X size={18} /></button><img src={event.image} alt="" /><div className="modal-content"><p className="eyebrow">{event.type}</p><h2>{event.title}</h2><p className="muted-line">{event.date} · {event.meta}</p><div className="modal-booking-row"><span>General admission</span><div className="quantity-control"><button onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button><b>{quantity}</b><button onClick={() => setQuantity((current) => Math.min(8, current + 1))}>+</button></div></div><div className="booking-total"><span>Estimated total</span><strong>${quantity * (event.price.includes('18') ? 18 : 25)}.00</strong></div><button className="yellow-button full-button" onClick={() => { onClose(); onNotice('Your booking flow is ready for secure payment'); }}>Continue booking <ArrowRight size={16} /></button><p className="fine-print">Availability and final pricing are confirmed before payment.</p></div></div></div>;
}

function Footer({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  return <footer className="site-footer"><div className="page-shell footer-top"><div className="footer-brand"><button className="brand footer-brand-button" onClick={() => onNavigate('home')}><span className="brand-mark"><Clapperboard size={18} /></span><span><strong>BLOCKBUSTER</strong><b>2.0</b></span></button><p>Rebuilding the way people discover, connect and experience entertainment.</p><span className="footer-credit">Designed by Monjit Singh</span></div><div className="footer-links"><div><p className="eyebrow">EXPLORE</p><button onClick={() => onNavigate('discover')}>Discover</button><button onClick={() => onNavigate('events')}>Experience hubs</button><button onClick={() => onNavigate('gaming')}>Gaming tournaments</button><button onClick={() => onNavigate('membership')}>Rewind+ membership</button></div><div><p className="eyebrow">COMPANY</p><button onClick={() => onNavigate('about')}>About us</button><button onClick={() => onNavigate('team')}>Our team</button><button onClick={() => onNavigate('corporate')}>Corporate events</button><button onClick={() => onNavigate('college')}>College events</button></div><div><p className="eyebrow">SUPPORT</p><button onClick={() => onNavigate('contact')}>Contact us</button><button onClick={() => onNavigate('how-it-works')}>How it works</button><button onClick={() => onNavigate('account')}>My account</button><button onClick={() => onNavigate('admin')}>Control room</button></div></div></div><div className="page-shell footer-bottom"><span>© 2026 Blockbuster 2.0 · A proposed new venture</span><span>Privacy · Terms · Cancellation</span><span>DISCOVER. CONNECT. EXPERIENCE. REPEAT.</span></div></footer>;
}

export default App;
