import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/form/form').then((c) => c.Form),
  },
  {
    path: 'listar',
    loadComponent: () =>
      import('./components/list-submisions/list-submisions').then((c) => c.ListSubmisions),
  },
];
