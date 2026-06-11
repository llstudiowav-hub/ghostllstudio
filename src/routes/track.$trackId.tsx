import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Music, Clock, Zap, Tag, Headphones, Mail, Check } from "lucide-react";
import { getTrackById } from "../lib/tracks";

export const Route = createFileRoute("/track/$trackId")({
  head: ({ params }) => {
    const track = getTrackById(params.trackId);
    return {
      meta: [
        { title: track ? `${track.title} | LL Studio Music` : "Track | LL Studio Music" },
        { name: "description", content: track ? `${track.description} — Available from €${track.price}` : "Ghost production track details" },
      ],
    };
  },
  component: TrackDetailPage,
});

function TrackDetailPage() {
  const { trackId } = Route.useParams();
  const track = getTrackById(trackId);

  if (!track) {
    throw notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <Link
        to="/catalog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to catalog
      </Link>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Left: Visual */}
        <div className="lg:col-span-2">
          <div className="aspect-square overflow-hidden rounded-2xl bg-surface-elevated">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gold/10">
                  <Music className="h-10 w-10 text-gold" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Demo Preview</p>
              </div>
            </div>
          </div>

          {/* Track Specs */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <Zap className="mx-auto h-5 w-5 text-gold" />
              <p className="mt-2 text-xl font-bold text-foreground">{track.bpm}</p>
              <p className="text-xs text-muted-foreground">BPM</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <Music className="mx-auto h-5 w-5 text-gold" />
              <p className="mt-2 text-xl font-bold text-foreground">{track.key}</p>
              <p className="text-xs text-muted-foreground">Key</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <Clock className="mx-auto h-5 w-5 text-gold" />
              <p className="mt-2 text-xl font-bold text-foreground">{track.duration}</p>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <Music className="h-3 w-3" />
              {track.genre}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            {track.title}
          </h1>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            {track.description}
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {track.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Pricing */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Pricing Options</h3>

            <div className="rounded-xl border border-border/50 bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Non-Exclusive License</p>
                  <p className="text-sm text-muted-foreground">
                    Use the track with shared rights. Perfect for releases.
                  </p>
                </div>
                <p className="text-2xl font-bold text-gold">&euro;{track.price}</p>
              </div>
            </div>

            <div className="relative rounded-xl border-2 border-gold/30 bg-card p-6">
              <div className="absolute -top-3 right-4 rounded-full bg-gold px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                Recommended
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Exclusive License</p>
                  <p className="text-sm text-muted-foreground">
                    Full ownership. The track is removed from our catalog.
                  </p>
                </div>
                <p className="text-2xl font-bold text-gold">&euro;{track.exclusivePrice}</p>
              </div>
            </div>
          </div>

          {/* What you get */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-foreground">What You Get</h3>
            <ul className="mt-4 space-y-3">
              {[
                "Full master WAV file (24-bit, 44.1kHz)",
                "Stems / Project files (if applicable)",
                "100% royalty-free rights",
                "Signed agreement / contract",
                "Fast delivery within 24 hours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={`https://wa.me/5575981109129?text=Hi! I'm interested in the track "${encodeURIComponent(track.title)}" (ID: ${track.id}). Can you tell me more?`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-gold-muted hover:scale-105"
            >
              <Headphones className="h-5 w-5" />
              Inquire on WhatsApp
            </a>
            <a
              href={`mailto:llstudio.wav@gmail.com?subject=${encodeURIComponent(`Inquiry: ${track.title}`)}&body=${encodeURIComponent(`Hi LL Studio Music,\n\nI'm interested in the track "${track.title}" (ID: ${track.id}).\n\nPlease send me more details about pricing and delivery.\n\nBest regards,`)}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-medium text-foreground transition-all hover:bg-surface-elevated"
            >
              <Mail className="h-5 w-5" />
              Email Inquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
