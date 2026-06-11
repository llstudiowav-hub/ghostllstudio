import { Link } from "@tanstack/react-router";
import { Play, Clock, Music, Zap } from "lucide-react";
import type { Track } from "../lib/tracks";

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <Link
      to="/track/$trackId"
      params={{ trackId: track.id }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
    >
      <div className="relative aspect-square bg-surface-elevated">
        {track.cover_url ? (
          <img src={track.cover_url} alt={track.title} className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface/80 opacity-0 transition-opacity group-hover:opacity-100">
            <Play className="h-8 w-8 text-gold" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {track.is_new && <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">New</span>}
          {track.is_best_seller && <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase text-background">Best Seller</span>}
          {track.is_sold && <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase text-destructive-foreground">Sold</span>}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold/20 px-2 py-0.5 text-xs font-medium text-gold">
            <Music className="h-3 w-3" />
            {track.genre}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-foreground group-hover:text-gold transition-colors">
          {track.title}
        </h3>
        {track.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{track.description}</p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Zap className="h-3 w-3" />{track.bpm} BPM</span>
          <span>•</span>
          <span>{track.key}</span>
          {track.duration && (<><span>•</span><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{track.duration}</span></>)}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/30">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-lg font-bold text-gold">€{track.price}</p>
          </div>
          {track.exclusive_price && (
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              Exclusive €{track.exclusive_price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
