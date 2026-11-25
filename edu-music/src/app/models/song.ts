export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  plays: number;
  duration: number; // segundos
}

export interface MenuItem {
  title: string;
  link: string;
  icon: string;
  hint: string;
}
