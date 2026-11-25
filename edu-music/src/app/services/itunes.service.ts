import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { getJson } from './http';

interface ItunesResponse { results: { artworkUrl100?: string }[]; }

/** Consume la API pública de iTunes (sin API key) para traer la carátula. */
@Injectable({ providedIn: 'root' })
export class ItunesService {
  async artwork(term: string, signal?: AbortSignal): Promise<string | null> {
    const data = await getJson<ItunesResponse>(
      environment.itunesUrl,
      { term, media: 'music', entity: 'song', limit: '1' },
      signal,
    );
    return data.results?.[0]?.artworkUrl100?.replace('100x100', '300x300') ?? null;
  }
}
