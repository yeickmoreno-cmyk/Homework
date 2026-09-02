import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-contact-item',
  styleUrl: './contact-item.css',
  templateUrl: './contact-item.html',
})
export class ContactItem {
  @Input() name: string = '';
  @Input() phone: string = '';
  @Output() deleteContact = new EventEmitter<void>();

  onDelete() {
    this.deleteContact.emit();
  }
}
