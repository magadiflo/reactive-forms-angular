import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./forms/forms.routes'),
  },
  { path: '**', redirectTo: 'form', },
];
