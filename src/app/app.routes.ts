import { Routes } from '@angular/router';
import { AutenticazioneGuard } from './guards/autenticazione.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Nova - La casa piÃ¹ intelligente di te'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    title: 'Nova - Accesso Portale'
  },
  {
    path: 'prodotti',
    loadComponent: () => import('./features/prodotti/prodotti.component').then(m => m.ProdottiComponent),
    title: 'Nova - Catalogo Prodotti'
  },
  {
    path: 'prodotti/:id',
    loadComponent: () => import('./features/dettaglio-prodotto/dettaglio-prodotto.component').then(m => m.DettaglioProdottoComponent),
    title: 'Nova - Dettaglio'
  },
  {
    path: 'carrello',
    canActivate: [AutenticazioneGuard],
    loadComponent: () => import('./features/carrello/carrello.component').then(m => m.CarrelloComponent),
    title: 'Nova - Area Checkout'
  },
  {
    path: 'ai-assistant',
    loadComponent: () => import('./features/ai-assistant/ai-assistant.component').then(m => m.AiAssistantComponent),
    title: 'Nova - Assistente Preventivi e Supporto'
  },
  {
    path: 'supporto',
    loadComponent: () => import('./features/supporto/supporto.component').then(m => m.SupportoComponent),
    title: 'Nova - Supporto Clienti'
  },
  {
    path: 'dashboard',
    canActivate: [AutenticazioneGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Nova - Area Comando (Dashboard)'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./features/servizi/servizi.component').then(m => m.ServiziComponent),
    title: 'Nova - Servizi Smart Home e Impianti'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Nova - Chi Siamo'
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Segnale Perso - Nova'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

