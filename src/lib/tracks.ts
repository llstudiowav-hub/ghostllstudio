export interface Track {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  key: string;
  duration: string;
  price: number;
  exclusivePrice: number;
  description: string;
  tags: string[];
  sold: boolean;
  featured: boolean;
  createdAt: string;
}

export const genres = [
  "All",
  "Techno",
  "House",
  "Tech House",
  "Melodic Techno",
  "Deep House",
  "Progressive House",
  "Minimal",
  " Afro House",
];

export const tracks: Track[] = [
  {
    id: "track-001",
    title: "Midnight Protocol",
    genre: "Techno",
    bpm: 132,
    key: "F#min",
    duration: "6:24",
    price: 149,
    exclusivePrice: 449,
    description:
      "Driving peak-time techno with hypnotic synth stabs, rolling bassline, and intricate percussion. Perfect for peak-hour sets and warehouse raves.",
    tags: ["peak time", "warehouse", "driving", "hypnotic"],
    sold: false,
    featured: true,
    createdAt: "2026-05-15",
  },
  {
    id: "track-002",
    title: "Aether Drift",
    genre: "Melodic Techno",
    bpm: 124,
    key: "Dmin",
    duration: "7:12",
    price: 159,
    exclusivePrice: 479,
    description:
      "Ethereal melodic techno journey with soaring pads, subtle arpeggios, and a deep, emotive progression. Ideal for sunrise moments and emotional peaks.",
    tags: ["melodic", "emotional", "sunrise", "progressive"],
    sold: false,
    featured: true,
    createdAt: "2026-05-10",
  },
  {
    id: "track-003",
    title: "Subterranean",
    genre: "Tech House",
    bpm: 128,
    key: "Amin",
    duration: "5:48",
    price: 139,
    exclusivePrice: 419,
    description:
      "Groovy tech house with chunky bass stabs, shuffled percussion, and vocal chops. Club-tested and dancefloor-approved.",
    tags: ["groovy", "club", "vocal chops", "bass"],
    sold: false,
    featured: false,
    createdAt: "2026-04-28",
  },
  {
    id: "track-004",
    title: "Obsidian",
    genre: "Techno",
    bpm: 135,
    key: "Gmin",
    duration: "6:08",
    price: 149,
    exclusivePrice: 449,
    description:
      "Dark and relentless industrial techno. Distorted kicks, metallic percussion, and tension-building breakdowns. For the darkest rooms.",
    tags: ["industrial", "dark", "distorted", "relentless"],
    sold: false,
    featured: true,
    createdAt: "2026-04-20",
  },
  {
    id: "track-005",
    title: "Solar Flare",
    genre: "House",
    bpm: 126,
    key: "Cmaj",
    duration: "5:36",
    price: 129,
    exclusivePrice: 389,
    description:
      "Uplifting house with bright chords, funky bass, and infectious energy. A guaranteed crowd pleaser for any main room.",
    tags: ["uplifting", "funky", "main room", "bright"],
    sold: false,
    featured: false,
    createdAt: "2026-04-15",
  },
  {
    id: "track-006",
    title: "Deep Resonance",
    genre: "Deep House",
    bpm: 122,
    key: "Emin",
    duration: "6:45",
    price: 139,
    exclusivePrice: 419,
    description:
      "Soulful deep house with warm Rhodes chords, smooth bass, and delicate vocal textures. Perfect for intimate venues and beach sunsets.",
    tags: ["soulful", "warm", "vocal", "intimate"],
    sold: false,
    featured: false,
    createdAt: "2026-04-10",
  },
  {
    id: "track-007",
    title: "Terra Incognita",
    genre: "Progressive House",
    bpm: 128,
    key: "Bmin",
    duration: "8:02",
    price: 169,
    exclusivePrice: 509,
    description:
      "Epic progressive house odyssey with layered melodies, evolving atmospheres, and a powerful emotional arc. Festival-ready anthem material.",
    tags: ["epic", "festival", "anthem", "evolving"],
    sold: false,
    featured: true,
    createdAt: "2026-04-01",
  },
  {
    id: "track-008",
    title: "Micro Shift",
    genre: "Minimal",
    bpm: 125,
    key: "G#min",
    duration: "6:18",
    price: 119,
    exclusivePrice: 359,
    description:
      "Precision-crafted minimal with microscopic details, rolling grooves, and subtle melodic fragments. For the connoisseurs.",
    tags: ["minimal", "groove", "subtle", "detailed"],
    sold: false,
    featured: false,
    createdAt: "2026-03-25",
  },
  {
    id: "track-009",
    title: "Savanna Dreams",
    genre: "Afro House",
    bpm: 120,
    key: "Fmaj",
    duration: "6:55",
    price: 149,
    exclusivePrice: 449,
    description:
      "Infectious Afro house with organic percussion, tribal vocals, and warm bass. A journey through rhythm and culture.",
    tags: ["tribal", "organic", "percussive", "warm"],
    sold: false,
    featured: false,
    createdAt: "2026-03-20",
  },
  {
    id: "track-010",
    title: "Neon Horizon",
    genre: "Tech House",
    bpm: 127,
    key: "D#min",
    duration: "5:52",
    price: 139,
    exclusivePrice: 419,
    description:
      "Futuristic tech house with crisp hi-hats, acid-tinged bass, and neon-bright synth lines. Peak-time energy with modern edge.",
    tags: ["futuristic", "acid", "peak time", "modern"],
    sold: false,
    featured: false,
    createdAt: "2026-03-15",
  },
  {
    id: "track-011",
    title: "Lunar Phase",
    genre: "Melodic Techno",
    bpm: 123,
    key: "Amin",
    duration: "7:30",
    price: 159,
    exclusivePrice: 479,
    description:
      "Cinematic melodic techno with orchestral elements, spacey textures, and a breathtaking breakdown. Truly transcendent.",
    tags: ["cinematic", "orchestral", "spacey", "transcendent"],
    sold: false,
    featured: false,
    createdAt: "2026-03-10",
  },
  {
    id: "track-012",
    title: "Carbon Black",
    genre: "Techno",
    bpm: 138,
    key: "Cmin",
    duration: "5:45",
    price: 149,
    exclusivePrice: 449,
    description:
      "Hard-hitting techno with distorted drums, razor-sharp hats, and relentless energy. For the hardest floors.",
    tags: ["hard", "distorted", "relentless", "peak time"],
    sold: false,
    featured: false,
    createdAt: "2026-03-05",
  },
];

export function getTrackById(id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}

export function getFeaturedTracks(): Track[] {
  return tracks.filter((t) => t.featured && !t.sold);
}

export function getTracksByGenre(genre: string): Track[] {
  if (genre === "All") return tracks.filter((t) => !t.sold);
  return tracks.filter((t) => t.genre === genre && !t.sold);
}
