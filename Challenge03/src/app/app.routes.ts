import { Routes } from '@angular/router';
import { SongPlayerComponent } from './pages/songplayer/song-player';
import { BrowserHistoryComponent } from './pages/browser-history/browser-history';

export const routes: Routes = [
  { path: 'songs', component: SongPlayerComponent },
  { path: 'browser', component: BrowserHistoryComponent },
  { path: '', redirectTo: 'songs', pathMatch: 'full' }
];