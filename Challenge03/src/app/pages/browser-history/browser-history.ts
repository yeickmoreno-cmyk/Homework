import { Component, OnInit } from '@angular/core';
import { DoublyLinkedList, DoubleNode } from '../../models/doubly-linked-list';

@Component({
  selector: 'app-browser-history',
  standalone: true,
  templateUrl: './browser-history.html'
})
export class BrowserHistoryComponent implements OnInit {
  historyList = new DoublyLinkedList();
  currentPage: DoubleNode | null = null;

  ngOnInit() {
    this.historyList.append({ url: 'google.com' });
    this.historyList.append({ url: 'github.com' });
    this.historyList.append({ url: 'angular.dev' });
    this.currentPage = this.historyList.tail;
  }

  goBack() {
    if (this.currentPage?.prev) {
      this.currentPage = this.currentPage.prev;
    }
  }

  goForward() {
    if (this.currentPage?.next) {
      this.currentPage = this.currentPage.next;
    }
  }
}