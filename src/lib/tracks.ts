export interface Track {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  key: string;
  duration: string | null;
  price: number;
  exclusive_price: number | null;
  description: string | null;
  tags: string[] | null;
  demo_url: string | null;
  cover_url: string | null;
  is_new: boolean;
  is_best_seller: boolean;
  is_sold: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
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
  "Afro House",
];
