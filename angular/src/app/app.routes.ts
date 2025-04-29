import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import ('./components/login/login.component').then(c => c.LoginComponent), },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent) },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'tasks',
    loadComponent: () => import('./components/tasks/tasks.component').then(c => c.TasksComponent),
    canActivate: [authGuard]
  },
  //{ path: 'task/new', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
  {
    path: 'notes',
    loadComponent: () => import('./components/notes/notes.component').then(c => c.NotesComponent),
    canActivate: [authGuard]
  },
  //{ path: 'notes/new', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
  {
    path: 'account',
    loadComponent: () => import('./components/account/account.component').then(c => c.AccountComponent),
    canActivate: [authGuard]
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then(c => c.AboutComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' }
];
