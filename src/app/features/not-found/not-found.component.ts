import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-container nova-container" data-aos="fade-up">
      <div class="hologram-container">
        <h1 class="font-orbitron error-code text-gradient">404</h1>
        <p class="hologram-text">SEGNALE PERSO</p>
        <div class="scanline"></div>
      </div>
      
      <div class="message-box glass-panel">
        <p class="subtitle">La rotta spaziale richiesta non esiste nel database NeuroHome.</p>
        <p class="action-text">L'AI Assistente suggerisce:</p>
        <a routerLink="/" class="btn-main font-orbitron">Ritorna alla Base &lt;Home&gt;</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: calc(100vh - 150px); text-align: center; padding-top: 100px; padding-bottom: 2rem;
    }
    
    .hologram-container {
      position: relative; margin-bottom: var(--spacing-xl); padding: 40px;
    }
    
    .error-code {
      font-size: 8rem; line-height: 1; letter-spacing: 10px; opacity: 0.9;
      filter: drop-shadow(0 0 20px var(--accent-cyan));
    }
    
    .hologram-text {
      font-size: 1.5rem; letter-spacing: 5px; color: var(--accent-cyan);
      font-weight: 700; font-family: monospace; display: inline-block;
      text-transform: uppercase; animation: pulse 2s infinite alternate;
    }
    
    .scanline {
      position: absolute; top: 0; left: 0; width: 100%; height: 3px;
      background: rgba(0,229,255,0.6); box-shadow: 0 0 10px var(--accent-cyan);
      animation: scan 4s ease-in-out infinite; opacity: 0.8;
    }
    
    @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
    @keyframes pulse { 0% { text-shadow: 0 0 5px var(--accent-cyan); opacity: 0.7; } 100% { text-shadow: 0 0 20px var(--accent-cyan); opacity: 1; } }
    
    .message-box { padding: var(--spacing-xl); max-width: 600px; display: flex; flex-direction: column; align-items: center; }
    .subtitle { font-size: 1.2rem; color: var(--text-primary); margin-bottom: 12px; }
    .action-text { color: var(--text-secondary); margin-bottom: 24px; font-style: italic; }
    
    .btn-main {
      padding: 12px 24px; color: var(--primary-dark); background: var(--accent-cyan); border-radius: 8px;
      text-decoration: none; font-weight: 700; letter-spacing: 1px; transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-main:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(0,229,255,0.4); }
  `]
})
export class NotFoundComponent {}
