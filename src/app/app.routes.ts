import { Routes } from '@angular/router';
import { AutenticazioneGuard } from './guards/autenticazione.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Dynamic Laboratories - La casa più intelligente di te'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    title: 'Dynamic Laboratories - Accesso Portale'
  },
  {
    path: 'prodotti',
    loadComponent: () => import('./features/prodotti/prodotti.component').then(m => m.ProdottiComponent),
    title: 'Dynamic Laboratories - Catalogo Prodotti'
  },
  {
    path: 'prodotti/:id',
    loadComponent: () => import('./features/dettaglio-prodotto/dettaglio-prodotto.component').then(m => m.DettaglioProdottoComponent),
    title: 'Dynamic Laboratories - Dettaglio'
  },
  {
    path: 'carrello',
    canActivate: [AutenticazioneGuard],
    loadComponent: () => import('./features/carrello/carrello.component').then(m => m.CarrelloComponent),
    title: 'Dynamic Laboratories - Area Checkout'
  },
  {
    path: 'ai-assistant',
    loadComponent: () => import('./features/ai-assistant/ai-assistant.component').then(m => m.AiAssistantComponent),
    title: 'Dynamic Laboratories - Assistente Preventivi e Supporto'
  },
  {
    path: 'supporto',
    loadComponent: () => import('./features/supporto/supporto.component').then(m => m.SupportoComponent),
    title: 'Dynamic Laboratories - Supporto Clienti'
  },
  {
    path: 'dashboard',
    canActivate: [AutenticazioneGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dynamic Laboratories - Area Comando (Dashboard)'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./features/servizi/servizi.component').then(m => m.ServiziComponent),
    title: 'Dynamic Laboratories - Servizi Smart Home e Impianti'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Dynamic Laboratories - Chi Siamo'
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Segnale Perso - Dynamic Laboratories'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

