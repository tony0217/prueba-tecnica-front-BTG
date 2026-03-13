import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'funds-explorer',
    loadComponent: () => import('./features/funds-explorer/funds-explorer').then(m => m.FundsExplorer)
  },
  {
    path: 'my-investments',
    loadComponent: () => import('./features/my-investments/my-investments').then(m => m.MyInvestments)
  },
  {
    path: 'transaction-history',
    loadComponent: () => import('./features/transaction-history/transaction-history').then(m => m.TransactionHistory)
  },
  { path: '**', redirectTo: 'dashboard' }
];
