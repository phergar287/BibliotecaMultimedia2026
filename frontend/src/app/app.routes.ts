import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { BooksComponent } from './components/books/books';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'libros', component: BooksComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
