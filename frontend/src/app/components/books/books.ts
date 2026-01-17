import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  isLoading = true;
  authService = inject(AuthService);

  ngOnInit() {
    this.authService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        if (err.status === 403 || err.status === 401) {
          this.authService.logout();
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
