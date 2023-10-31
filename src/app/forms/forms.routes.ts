import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: 'basic',
        loadComponent: () => import('./pages/basic-page/basic-page.component').then(c => c.BasicPageComponent),
      },
      {
        path: 'middle',
        loadComponent: () => import('./pages/middle-page/middle-page.component').then(c => c.MiddlePageComponent),
      },
      {
        path: 'advanced-one',
        loadComponent: () => import('./pages/advanced-one-page/advanced-one-page.component').then(c => c.AdvancedOnePageComponent),
      },
      {
        path: 'advanced-two',
        loadComponent: () => import('./pages/advanced-two-page/advanced-two-page.component').then(c => c.AdvancedTwoPageComponent),
      },
      { path: '**', redirectTo: 'basic', },
    ]
  }
] as Routes;
