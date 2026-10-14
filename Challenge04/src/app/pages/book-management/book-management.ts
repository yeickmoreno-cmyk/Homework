import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Stack, Book } from '../../models/book-stack';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '../book-management/book-management.html', // <-- Enlace al archivo HTML
  styleUrl: '../book-management/book-management.css' // <-- Enlace al archivo CSS
})
export class BookManagementComponent implements OnInit {
  bookStack = new Stack();
  booksList: Book[] = [];

  newBook: Book = { name: '', isbn: '', author: '', editorial: '' };

  ngOnInit() {
    this.bookStack.push({ name: 'Cien Años de Soledad', isbn: '978-030', author: 'Gabriel García Márquez', editorial: 'Sudamericana' });
    this.bookStack.push({ name: 'El Principito', isbn: '978-015', author: 'Antoine de Saint-Exupéry', editorial: 'Reynal' });
    this.updateScreen();
  }

  addBook() {
    if (this.newBook.name && this.newBook.isbn) {
      this.bookStack.push({ ...this.newBook });
      this.newBook = { name: '', isbn: '', author: '', editorial: '' }; 
      this.updateScreen();
    }
  }

  updateScreen() {
    this.booksList = this.bookStack.print();
  }
}