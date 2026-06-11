import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, Shield, Music, Globe, Award } from "lucide-react";
import { getFeaturedTracks } from "../lib/tracks";
import { TrackCard } from "../components/TrackCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LL Studio Music | Premium Ghost Production Marketplace" },
      { name: "description", content: "Exclusive ghost productions for international DJs, labels, and artists. Browse, listen, and acquire professional electronic music tracks with full ownership rights." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = getFeaturedTracks();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-surface-elevated)_0%,_transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <img
                src="/assets/logo.png"
                alt="LL Studio Music"
                className="h-16 w-16 object-contain"
              />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Your Next Track,
              <br />
              <span className="text-gold">Ready to Release</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Exclusive ghost productions crafted for international DJs, labels,
              and artists. Full ownership. Professional quality. Ready to sign.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-gold-muted hover:scale-105"
              >
                Browse Catalog
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/5575981109129"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-medium text-foreground transition-all hover:bg-surface-elevated"
              >
                <Headphones className="h-5 w-5" />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "100+", label: "Tracks Produced" },
              { value: "50+", label: "Artists Served" },
              { value: "3+", label: "Years Experience" },
              { value: "100%", label: "Exclusive Rights" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gold md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tracks */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Featured Tracks
            </h2>
            <p className="mt-2 text-muted-foreground">
              Handpicked productions ready for your next release
            </p>
          </div>
          <Link
            to="/catalog"
            className="hidden items-center gap-1 text-sm font-medium text-gold transition-colors hover:text-gold-muted sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1 text-sm font-medium text-gold"
          >
            View all tracks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Why Producers Choose LL Studio
            </h2>
            <p className="mt-4 text-muted-foreground">
              We deliver more than tracks &mdash; we deliver career accelerators
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Full Ownership",
                desc: "Every track comes with 100% exclusive rights. You own the masters, publishing, and all royalties.",
              },
              {
                icon: Music,
                title: "Production Ready",
                desc: "All tracks are professionally mixed and mastered to industry standards. Release-ready quality guaranteed.",
              },
              {
                icon: Globe,
                title: "Label Quality",
                desc: "Crafted for top-tier labels and main stages. Our productions meet the standards of the biggest imprints.",
              },
              {
                icon: Award,
                title: "Proven Results",
                desc: "Our ghost productions have been signed to major labels and played at festivals worldwide.",
              },
              {
                icon: Headphones,
                title: "Personal Service",
                desc: "Direct communication via WhatsApp and email. No intermediaries. Get answers within hours, not days.",
              },
              {
                icon: ArrowRight,
                title: "Fast Delivery",
                desc: "Receive your complete project files within 24 hours of purchase confirmation.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-gold/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                  <feature.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-surface-elevated px-6 py-16 text-center md:px-16 md:py-20">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Ready to Elevate Your Sound?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Browse our catalog or reach out directly. Let's find the perfect
              track for your next release.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-gold-muted"
              >
                Browse Tracks
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/5575981109129"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-medium text-foreground transition-all hover:bg-surface"
              >
                <Headphones className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
