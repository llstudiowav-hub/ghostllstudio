import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Music, Crown, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/licensing")({
  head: () => ({
    meta: [
      { title: "Licensing | LL Studio Music" },
      { name: "description", content: "Understand our licensing options for ghost production tracks. Non-exclusive and exclusive licenses available." },
    ],
  }),
  component: LicensingPage,
});

function LicensingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Licensing Options</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Clear, simple licensing. Choose the option that fits your goals.
        </p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {/* Non-Exclusive */}
        <div className="rounded-2xl border border-border/50 bg-card p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
            <Music className="h-6 w-6 text-gold" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-foreground">Non-Exclusive License</h2>
          <p className="mt-2 text-muted-foreground">
            Use the track with shared rights. The track remains in our catalog.
          </p>

          <div className="mt-6">
            <p className="text-3xl font-bold text-gold">Starting at &euro;129</p>
            <p className="text-sm text-muted-foreground">per track</p>
          </div>

          <ul className="mt-8 space-y-3">
            {[
              "Use in releases and live sets",
              "Shared rights with other licensees",
              "Track remains in our catalog",
              "Full master WAV file included",
              "Royalty-free for your releases",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            to="/catalog"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-surface-elevated"
          >
            Browse Tracks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Exclusive */}
        <div className="relative rounded-2xl border-2 border-gold/30 bg-card p-8">
          <div className="absolute -top-3 right-6 rounded-full bg-gold px-4 py-1 text-xs font-semibold text-primary-foreground">
            Most Popular
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
            <Crown className="h-6 w-6 text-gold" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-foreground">Exclusive License</h2>
          <p className="mt-2 text-muted-foreground">
            Full ownership of the track. Removed from our catalog permanently.
          </p>

          <div className="mt-6">
            <p className="text-3xl font-bold text-gold">Starting at &euro;359</p>
            <p className="text-sm text-muted-foreground">per track</p>
          </div>

          <ul className="mt-8 space-y-3">
            {[
              "100% exclusive ownership",
              "Track removed from our catalog",
              "Full master WAV file included",
              "Stems and project files included",
              "Signed transfer agreement",
              "Unlimited commercial use",
              "100% royalty-free forever",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            to="/catalog"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-gold-muted"
          >
            Browse Tracks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-14 rounded-2xl border border-border/50 bg-surface p-8">
        <h3 className="text-lg font-semibold text-foreground">Need Help Deciding?</h3>
        <p className="mt-2 text-muted-foreground">
          Not sure which license fits your needs? We're happy to explain the differences
          and recommend the best option for your situation.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://wa.me/5575981109129"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-surface-elevated"
          >
            Message on WhatsApp
          </a>
          <a
            href="mailto:llstudio.wav@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-surface-elevated"
          >
            Send an Email
          </a>
        </div>
      </div>
    </div>
  );
}
