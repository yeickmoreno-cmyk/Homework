import { Song } from '../models/song';

// [título, artista, género, reproducciones, duración (s)]
type Raw = [string, string, string, number, number];

const RAW: Raw[] = [
  // --- Algunas de las más escuchadas a nivel mundial ---
  ['Shape of You', 'Ed Sheeran', 'Pop', 1500, 233],
  ['Blinding Lights', 'The Weeknd', 'Pop', 1480, 200],
  ['Despacito', 'Luis Fonsi', 'Latino', 1450, 229],
  ['Someone You Loved', 'Lewis Capaldi', 'Pop', 1320, 182],
  ['Dance Monkey', 'Tones and I', 'Pop', 1300, 210],
  ['Believer', 'Imagine Dragons', 'Rock', 1250, 204],
  ['Bad Guy', 'Billie Eilish', 'Pop', 1280, 194],
  ['As It Was', 'Harry Styles', 'Pop', 1350, 167],
  ['Flowers', 'Miley Cyrus', 'Pop', 1340, 200],
  ['Bohemian Rhapsody', 'Queen', 'Rock', 1400, 354],
  ['Sunflower', 'Post Malone', 'Hip Hop', 1220, 158],
  ['Uptown Funk', 'Mark Ronson', 'Pop', 1180, 270],
  ['Levitating', 'Dua Lipa', 'Pop', 1260, 203],
  ['Hawái', 'Maluma', 'Latino', 1100, 200],
  // --- Canciones genéricas ---
  ['Summer Nights', 'Luna Park', 'Pop', 420, 196],
  ['Neon Skyline', 'Aurora Vale', 'Pop', 380, 188],
  ['Golden Hour Drive', 'The Coastliners', 'Pop', 350, 215],
  ['Paper Hearts', 'Mia Rowe', 'Pop', 300, 176],
  ['Highway Sparks', 'The Rustlines', 'Rock', 410, 222],
  ['Broken Static', 'Iron Meadow', 'Rock', 330, 241],
  ['Rebel Hearts', 'Wild Echo', 'Rock', 290, 207],
  ['Electric Garden', 'Stone Orchard', 'Rock', 260, 233],
  ['Noche de Fiesta', 'Los del Sol', 'Latino', 520, 198],
  ['Bailando en la Playa', 'Ritmo Caribe', 'Latino', 480, 205],
  ['Corazón de Verano', 'Valeria Mar', 'Latino', 440, 191],
  ['Sabor a Cali', 'Orquesta Pacífico', 'Latino', 500, 244],
  ['Cumbia del Río', 'Los Faroles', 'Latino', 360, 212],
  ['City Lights Flow', 'MC Atlas', 'Hip Hop', 390, 186],
  ['Late Night Bars', 'Kid Orbit', 'Hip Hop', 340, 174],
  ['Concrete Dreams', 'Mr. Echo', 'Hip Hop', 310, 199],
  ['Pulse Machine', 'Neon Pulse', 'Electrónica', 450, 218],
  ['Midnight Circuit', 'Synthwave Club', 'Electrónica', 400, 236],
  ['Digital Rain', 'Byte & Bass', 'Electrónica', 370, 205],
  ['Afterglow', 'Kora', 'Electrónica', 320, 227],
  ['Rainy Window', 'Lofi Dreamer', 'Chill', 280, 143],
  ['Coffee & Vinyl', 'Sleepy Tapes', 'Chill', 270, 151],
  ['Study Break', 'Calm Cat', 'Chill', 250, 138],
  ['Sunday Slow', 'Mellow Moon', 'Chill', 240, 160],
];

export const SONGS: Song[] = RAW.map(([title, artist, genre, plays, duration], i) => ({
  id: 's' + (i + 1), title, artist, genre, plays, duration,
}));

const idOf = (title: string) => SONGS.find((s) => s.title === title)!.id;

// Grafo no dirigido: cada canción se conecta con 2 del mismo género...
const edges = new Map<string, [string, string]>();
const addEdge = (a: string, b: string) => edges.set([a, b].sort().join('-'), [a, b]);

const byGenre = new Map<string, Song[]>();
SONGS.forEach((s) => byGenre.set(s.genre, [...(byGenre.get(s.genre) ?? []), s]));
byGenre.forEach((list) =>
  list.forEach((s, i) => {
    if (list[i + 1]) addEdge(s.id, list[i + 1].id);
    if (list[i + 2]) addEdge(s.id, list[i + 2].id);
  }),
);

// ...y algunas conexiones entre géneros
const CROSS: [string, string][] = [
  ['Blinding Lights', 'Pulse Machine'],
  ['Blinding Lights', 'Midnight Circuit'],
  ['Levitating', 'Afterglow'],
  ['Despacito', 'Noche de Fiesta'],
  ['Hawái', 'Sabor a Cali'],
  ['Sunflower', 'City Lights Flow'],
  ['Uptown Funk', 'Noche de Fiesta'],
  ['Bad Guy', 'Rainy Window'],
  ['Someone You Loved', 'Sunday Slow'],
  ['Believer', 'Highway Sparks'],
  ['Bohemian Rhapsody', 'Broken Static'],
  ['As It Was', 'Summer Nights'],
  ['Dance Monkey', 'Cumbia del Río'],
];
CROSS.forEach(([a, b]) => addEdge(idOf(a), idOf(b)));

export const EDGES: [string, string][] = [...edges.values()];
