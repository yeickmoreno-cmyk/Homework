import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-contact-form',
  styleUrl: './contact-form.css',
  templateUrl: './contact-form.html',
})
export class ContactForm {
  @Output() addContact = new EventEmitter<{ name: string; phone: string }>();

  name: string = '';
  phone: string = '';

  onSubmit() {
    if (this.name.trim() && this.phone.trim()) {
      this.addContact.emit({ name: this.name.trim(), phone: this.phone.trim() });
      this.name = '';
      this.phone = '';
    }
  }
}
