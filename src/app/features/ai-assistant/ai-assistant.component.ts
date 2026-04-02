import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="coming-soon-container" data-aos="fade-up">
      <div class="glass-panel panel-info">
        <div class="soon-chip">COMING SOON</div>
        <div class="neural-core-icon"></div>
        <h1 class="title font-orbitron text-gradient">Assistente preventivi in addestramento</h1>
        <p class="mt-3">
          Stiamo finalizzando il motore conversazionale per offrirti un assistente casa realmente utile,
          proattivo e coerente con l'ecosistema Dynamic Laboratories.
        </p>
        <div class="progress-container mt-4">
          <div class="progress-bar"></div>
        </div>
        <p class="small text-secondary mt-2">Training progress: 87%</p>
        <div class="actions mt-4">
          <button routerLink="/" class="btn-secondary">Torna alla Home</button>
          <button routerLink="/prodotti" class="btn-main">Scopri i Prodotti</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .coming-soon-container {
      width: 100%; min-height: calc(100vh - 70px);
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      background: radial-gradient(circle at center, rgba(3, 11, 7, 0.95) 0%, #020503 100%);
      position: relative; overflow: hidden; padding: 110px 20px 40px;
    }

    .soon-chip {
      display: inline-flex; margin: 0 auto 18px; padding: 8px 16px; border-radius: 999px;
      font-size: 0.78rem; letter-spacing: 1.8px; font-weight: 700;
      color: var(--accent-cyan); border: 1px solid rgba(39,224,143,0.35);       
      background: rgba(39,224,143,0.08);
    }

    .panel-info {
      width: 100%; max-width: 720px; text-align: center; padding: 44px 32px;    
      background: rgba(5, 18, 11, 0.7); backdrop-filter: blur(20px); border-radius: 24px;
      border: 1px solid rgba(82, 235, 163, 0.25); box-shadow: 0 0 40px rgba(39, 224, 143, 0.12);
    }
    
    .neural-core-icon {
      width: 80px; height: 80px; margin: 0 auto 30px auto; border-radius: 50%;
      background: radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%);
      box-shadow: 0 0 30px var(--accent-cyan); animation: pulse 2s infinite alternate;
    }

    .mt-3 { margin-top: 1rem; } .mt-4 { margin-top: 2rem; } .mt-2 { margin-top: 0.5rem; }
    p { color: var(--text-secondary); line-height: 1.6; font-size: 1.04rem; }
    .small { font-size: 0.9rem; font-family: monospace; letter-spacing: 1px; color: var(--accent-cyan) !important;}

    .progress-container { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
    .progress-bar { width: 87%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple)); box-shadow: 0 0 10px var(--accent-cyan); animation: loading 3s ease infinite;}
    
    .actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

    .btn-secondary, .btn-main {
      padding: 12px 24px; font-size: 0.95rem; font-family: 'Inter'; font-weight: 600; cursor: pointer;
      border-radius: 10px; transition: 0.3s;
    }
    .btn-secondary {
      background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; transition: 0.3s;
    }
    .btn-secondary:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
    .btn-main { background: linear-gradient(120deg, #effff7 0%, #87ffbe 42%, #2ad989 100%); color: #062514; border: none; }
    .btn-main:hover { transform: translateY(-2px); box-shadow: 0 0 20px rgba(39, 224, 143, 0.45); }

    @media (max-width: 640px) {
      .coming-soon-container { padding: 92px 14px 24px; }
      .panel-info { padding: 30px 18px; border-radius: 18px; }
      .neural-core-icon { width: 62px; height: 62px; margin-bottom: 20px; }
      p { font-size: 0.95rem; }
      .actions { flex-direction: column; }
      .btn-secondary, .btn-main { width: 100%; }
    }

    @keyframes pulse { 0% { transform: scale(0.9); opacity: 0.8; } 100% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 50px rgba(39,224,143,0.65); } }
    @keyframes loading { 0% { filter: brightness(1) } 50% { filter: brightness(1.5) } 100% { filter: brightness(1) } }
  `]
})
export class AiAssistantComponent {}

