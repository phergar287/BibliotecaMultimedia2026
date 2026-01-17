import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    console.log('Solicitando libros...');
    this.authService.getBooks().subscribe({
      next: (data) => {
        console.log('Libros recibidos:', data);
        this.books = data;
        this.isLoading = false;
        this.cdr.detectChanges(); // Force UI update
      },
      error: (err) => {
        console.error('Error al obtener libros:', err);
        this.isLoading = false;
        this.cdr.detectChanges(); // Force UI update
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
