import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MessageCircle, FileCheck, Download, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works | LL Studio Music" },
      { name: "description", content: "Learn how to browse, inquire, and acquire exclusive ghost production tracks from LL Studio Music." },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "Browse the Catalog",
      desc: "Explore our collection of exclusive ghost productions across multiple electronic genres. Filter by genre, BPM, and mood to find your perfect track.",
    },
    {
      icon: MessageCircle,
      title: "Inquire via WhatsApp or Email",
      desc: "Found a track you love? Send us a message on WhatsApp or email with the track ID. We'll confirm availability and answer any questions.",
    },
    {
      icon: FileCheck,
      title: "Choose Your License",
      desc: "Select between a non-exclusive license for shared rights or an exclusive license for full ownership. We'll prepare a simple agreement.",
    },
    {
      icon: Download,
      title: "Receive Your Files",
      desc: "After payment confirmation, you'll receive the full master WAV, stems, and all project files within 24 hours via secure transfer.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">How It Works</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Acquiring an exclusive ghost production is simple and straightforward
        </p>
      </div>

      <div className="mt-14 space-y-8">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="flex flex-col gap-6 rounded-2xl border border-border/50 bg-card p-8 md:flex-row md:items-center md:gap-8"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
              <step.icon className="h-7 w-7 text-gold" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                  {idx + 1}
                </span>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border/50 bg-surface p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold text-foreground">Ready to Get Started?</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Browse our catalog now or reach out directly. We're here to help you find the perfect track.
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
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-medium text-foreground transition-all hover:bg-surface-elevated"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
