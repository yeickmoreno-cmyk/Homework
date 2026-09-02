import { Component, signal } from '@angular/core';
import { ContactsLoader } from './contacts-loader/contacts-loader';
import { ContactList } from './contact-list/contact-list';
import { ContactForm } from './contact-form/contact-form';

@Component({
  imports: [ContactsLoader, ContactList, ContactForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-app2');
  public isLoading = signal<boolean>(true);
  public contacts = signal<{ name: string; phone: string }[]>([]);

  constructor() {
    this.loadContacts();
  }

  loadContacts() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.contacts.set([
        { name: 'Jonathan Lopez', phone: '315 926 5443' },
        { name: 'Maria Garcia', phone: '300 123 4567' },
        { name: 'Carlos Martinez', phone: '310 987 6543' },
      ]);
      this.isLoading.set(false);
    }, 2000);
  }

  addContact(contact: { name: string; phone: string }) {
    this.contacts.set([...this.contacts(), contact]);
  }

  deleteContact(index: number) {
    const newContacts = this.contacts().filter((_, i) => i !== index);
    this.contacts.set(newContacts);
  }
}
