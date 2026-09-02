import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactItem } from '../contact-item/contact-item';

@Component({
  imports: [ContactItem],
  selector: 'app-contact-list',
  styleUrl: './contact-list.css',
  templateUrl: './contact-list.html',
})
export class ContactList {
  @Input() contacts: { name: string; phone: string }[] = [];
  @Output() deleteContact = new EventEmitter<number>();

  onDelete(index: number) {
    this.deleteContact.emit(index);
  }
}
