import { Component, OnInit } from '@angular/core';
import { LinkedList, Node } from '../../models/singly-linked-list';

@Component({
  selector: 'app-song-player',
  standalone: true,
  templateUrl: './song-player.html'
})
export class SongPlayerComponent implements OnInit {
  songList = new LinkedList();
  currentSong: Node | null = null;

  ngOnInit() {
    this.songList.append({ title: 'Song 1 - Rock', artist: 'Band A' });
    this.songList.append({ title: 'Song 2 - Pop', artist: 'Singer B' });
    this.songList.append({ title: 'Song 3 - Jazz', artist: 'Band C' });
    this.songList.append({ title: 'Song 4 - Blues', artist: 'Singer D' });
    this.songList.append({ title: 'Song 5 - Classical', artist: 'Orchestra E' });
    this.currentSong = this.songList.head;
  }

  nextSong() {
    if (this.currentSong?.next) {
      this.currentSong = this.currentSong.next;
    }
  }
}