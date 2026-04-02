import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="nova-container footer-content">
        <div class="footer-brand">
          <h2 class="font-orbitron text-gradient">Domotic Laboratories</h2>
          <p class="tagline">Domotica, automazione ed efficienza energetica per casa e impresa.</p>
        </div>
        
        <div class="footer-links">
          <div class="link-column">
            <h3>Soluzioni</h3>
            <a routerLink="/prodotti">Dispositivi e Componenti</a>
            <a routerLink="/ai-assistant">Assistente Preventivi</a>
            <a routerLink="/servizi">Servizi Residenziali e Business</a>
          </div>
          
          <div class="link-column">
            <h3>Azienda</h3>
            <a routerLink="/about">Chi Siamo</a>
            <a routerLink="/supporto">Supporto Clienti</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Domotic Laboratories. Tutti i diritti riservati.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(180deg, #06110c 0%, #040906 100%);
      border-top: 1px solid var(--glass-border);
      padding: var(--spacing-xl) 0 0 0;
      margin-top: auto; /* Push to bottom if content is short */
    }
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
      padding-bottom: var(--spacing-xl);
    }
    @media (min-width: 768px) {
      .footer-content {
        flex-direction: row;
        justify-content: space-between;
      }
    }
    .footer-brand h2 {
      font-size: 1.8rem;
      margin-bottom: 8px;
    }
    .tagline {
      color: var(--text-secondary);
    }
    .footer-links {
      display: flex;
      gap: var(--spacing-xl);
      flex-wrap: wrap;
    }
    .link-column {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .link-column h3 {
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    .link-column a {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color var(--transition-fast);
    }
    .link-column a:hover {
      color: var(--accent-cyan);
    }
    .footer-bottom {
      text-align: center;
      padding: var(--spacing-md);
      border-top: 1px solid var(--glass-border);
      color: var(--text-secondary);
      font-size: 0.8rem;
      background: rgba(3, 12, 8, 0.68);
    }
  `]
})
export class FooterComponent {}
