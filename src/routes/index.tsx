import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ShieldCheck,
  Globe,
  Gem,
  Star,
  Tag,
  Headphones,
  ShoppingCart,
  MessageSquare,
  Check,
  Disc3,
  Activity,
  Layers,
  Home as HomeIcon,
  Sparkles,
  Music2,
  Box,
} from "lucide-react";
import { TrackCard } from "../components/TrackCard";
import { fetchTracks } from "../lib/db";
import heroDj from "../assets/hero-dj.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LL Studio Music | Premium Ghost Production Marketplace" },
      {
        name: "description",
        content:
          "Exclusive ghost productions for international DJs, labels and artists. Professional ready-to-release tracks with full ownership rights.",
      },
    ],
  }),
  component: HomePage,
});

const TRUST = [
  { icon: Star, value: "14+", label: "Years Experience" },
  { icon: Globe, value: "Worldwide", label: "Clients" },
  { icon: Gem, value: "Exclusive", label: "Tracks" },
  { icon: ShieldCheck, value: "Secure", label: "Transactions" },
];

const STEPS = [
  { n: "1", icon: Headphones, title: "Listen to Demos", desc: "Explore our exclusive catalog and listen to high-quality demos." },
  { n: "2", icon: ShoppingCart, title: "Submit Your Interest", desc: "Found the right track? Submit your interest in seconds." },
  { n: "3", icon: MessageSquare, title: "Receive Availability Confirmation", desc: "Our team will contact you via email or WhatsApp within minutes." },
  { n: "4", icon: Check, title: "Complete Purchase Manually", desc: "We finalize the sale and transfer full ownership of the track." },
];

const GENRES = [
  { name: "Afro House", icon: Disc3 },
  { name: "Peak Time Techno", icon: Activity },
  { name: "Melodic Techno", icon: Music2 },
  { name: "Hyper Techno", icon: Sparkles },
  { name: "Tech House", icon: Layers },
  { name: "House", icon: HomeIcon },
  { name: "Minimal", icon: Box },
  { name: "UK Garage", icon: Disc3 },
  { name: "Indie Dance", icon: Music2 },
];

function HomePage() {
  const { data: tracks = [] } = useQuery({ queryKey: ["tracks"], queryFn: fetchTracks });
  const featured = tracks.filter((t) => t.is_featured && !t.is_sold).slice(0, 5);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center md:px-6 md:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Exclusive Ghost Productions
            </p>
            <h1 className="mt-5 text-4xl font-black uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Exclusive Ghost Productions for DJs &amp; Artists
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Professional ready-to-release tracks for DJs, Labels and Music Producers.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:bg-gold-muted"
              >
                Browse Tracks <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-transparent px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-all hover:border-gold hover:text-gold"
              >
                Request Custom Production
              </Link>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-gold" />
              Availability is not guaranteed until purchase is completed.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-gold/10 via-transparent to-transparent blur-2xl" />
            <img
              src={heroDj}
              alt="DJ performing at festival"
              className="relative aspect-square w-full rounded-lg object-cover grayscale"
              width={1024}
              height={1024}
            />
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="border-b border-border/40 bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-6 md:py-10">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center gap-4">
              <t.icon className="h-8 w-8 shrink-0 text-gold" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-wider text-foreground">{t.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{t.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING BANNER */}
      <section className="mx-auto max-w-7xl px-4 pt-10 md:px-6">
        <div className="relative overflow-hidden rounded-md border border-gold/20 bg-[linear-gradient(110deg,#0a0a0a_0%,#1a1505_50%,#0a0a0a_100%)] px-6 py-8 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Tag className="h-6 w-6 text-gold" strokeWidth={1.5} />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
              Exclusive Ghost Tracks
            </p>
          </div>
          <p className="mt-2 text-2xl font-bold uppercase tracking-wider text-gold sm:text-3xl">
            From €100 to €200
          </p>
        </div>
      </section>

      {/* HOW IT WORKS + GENRES */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3 md:px-6">
        <div className="rounded-md border border-border/60 bg-card p-6 md:col-span-2 md:p-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground">How It Works</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <s.icon className="mx-auto h-9 w-9 text-gold" strokeWidth={1.5} />
                <p className="mt-3 text-2xl font-bold text-gold">{s.n}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-foreground leading-tight">
                  {s.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border/60 bg-card p-6 md:p-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground">Popular Genres</h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {GENRES.map((g) => (
              <Link
                key={g.name}
                to="/catalog"
                className="flex items-center gap-2 rounded-sm border border-border/50 bg-surface px-3 py-2.5 text-xs font-medium text-foreground transition-all hover:border-gold/40 hover:text-gold"
              >
                <g.icon className="h-3.5 w-3.5 text-gold shrink-0" strokeWidth={1.5} />
                <span className="uppercase tracking-wider truncate">{g.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRACKS */}
      <section className="mx-auto max-w-7xl px-4 pt-4 pb-10 md:px-6">
        <div className="rounded-md border border-border/60 bg-card p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground">Featured Tracks</h2>
            <Link to="/catalog" className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold hover:text-gold-muted">
              View All Tracks <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {featured.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {featured.map((track) => <TrackCard key={track.id} track={track} />)}
            </div>
          ) : (
            <p className="mt-8 text-center text-sm text-muted-foreground">No featured tracks yet.</p>
          )}
        </div>
      </section>

      {/* CUSTOM PRODUCTION CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 rounded-md border border-border/60 bg-card p-6 md:flex-row md:p-8">
          <div className="flex items-center gap-5">
            <Headphones className="h-10 w-10 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                Need a Custom Ghost Production?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us your idea and we'll create a unique track just for you.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:bg-gold-muted"
          >
            Request Custom Production <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
