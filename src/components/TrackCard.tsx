import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import type { Track } from "../lib/tracks";

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-md border border-border/60 bg-surface transition-all hover:border-gold/40 hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.3)]">
      <Link
        to="/track/$trackId"
        params={{ trackId: track.id }}
        className="relative block aspect-square overflow-hidden bg-surface-elevated"
      >
        {track.cover_url ? (
          <img
            src={track.cover_url}
            alt={track.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-background" />
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {track.is_new && (
            <span className="rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              New
            </span>
          )}
          {track.is_best_seller && (
            <span className="rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Best Seller
            </span>
          )}
          {!track.is_new && !track.is_best_seller && (
            <span className="rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Exclusive
            </span>
          )}
          {track.is_sold && (
            <span className="rounded-sm bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
              Sold
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold uppercase tracking-wide text-foreground transition-colors group-hover:text-gold">
          {track.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{track.genre}</p>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 text-[11px] text-muted-foreground">
          <span>{track.bpm} BPM</span>
          <span className="text-gold/60">•</span>
          <span>{track.key}</span>
          {track.duration && (
            <>
              <span className="text-gold/60">•</span>
              <span>{track.duration}</span>
            </>
          )}
        </div>

        <p className="mt-3 text-lg font-bold text-gold">€{track.price}</p>

        {track.demo_url && (
          <audio
            controls
            preload="none"
            src={track.demo_url}
            controlsList="nodownload"
            className="mt-3 h-9 w-full"
          />
        )}

        <a
          href={`https://wa.me/5575981109129?text=${encodeURIComponent(`I'm interested in "${track.title}" (€${track.price})`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-sm border border-gold bg-transparent px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
        >
          I'm Interested
        </a>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          <ShieldCheck className="h-3 w-3 text-gold" />
          Only 1 License Available
        </p>
      </div>
    </div>
  );
}
