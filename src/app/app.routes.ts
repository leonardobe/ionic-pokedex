import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon-details/pokemon-details.page').then( m => m.PokemonDetailsPage)
  },
];
