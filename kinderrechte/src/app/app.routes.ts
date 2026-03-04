import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'geschichte', loadComponent: () => import('./pages/timeline/timeline.component').then(m => m.TimelineComponent) },
  { path: 'artikel', loadComponent: () => import('./pages/articles/articles.component').then(m => m.ArticlesComponent) },
  { path: 'spiele', loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent) },
  { path: 'vermittlung', loadComponent: () => import('./pages/vermittlung/vermittlung.component').then(m => m.VermittlungComponent) },
  { path: '**', redirectTo: '' }
];
