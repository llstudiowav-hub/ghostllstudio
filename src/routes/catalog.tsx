import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { tracks, genres } from "../lib/tracks";
import { TrackCard } from "../components/TrackCard";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog | LL Studio Music" },
      { name: "description", content: "Browse exclusive ghost production tracks across Techno, House, Tech House, Melodic Techno, and more. Find your next release-ready track." },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = tracks.filter((t) => {
    const genreMatch = selectedGenre === "All" || t.genre === selectedGenre;
    const searchMatch =
      searchQuery === "" ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return genreMatch && searchMatch && !t.sold;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Track Catalog</h1>
        <p className="mt-2 text-muted-foreground">
          Browse {tracks.filter((t) => !t.sold).length} exclusive ghost productions
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tracks, genres, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedGenre === genre
                  ? "bg-gold text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No tracks match your search.</p>
          <button
            onClick={() => {
              setSelectedGenre("All");
              setSearchQuery("");
            }}
            className="mt-4 text-sm text-gold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
