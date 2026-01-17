import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  nombre = '';
  password = '';
  error = '';
  isLoading = false;

  private authService = inject(AuthService);

  login() {
    this.isLoading = true;
    this.error = '';

    this.authService.login({ nombre: this.nombre, password: this.password })
      .subscribe({
        next: () => {
          this.isLoading = false;
          // Navigation handled in service
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Credenciales incorrectas. Intenta de nuevo.';
          console.error(err);
        }
      });
  }
}
