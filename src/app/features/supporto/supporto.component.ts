import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-supporto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="support-container nova-container" data-aos="fade-up">
      <div class="row layout">
        <div class="col left-col glass-panel">
          <h1 class="font-orbitron text-gradient">Supporto Clienti</h1>
          <p class="desc">
            Se rilevi un'anomalia su impianto o dispositivo, il nostro team tecnico interviene con presa in carico rapida.
          </p>
          
          <div class="contact-info mt-4">
            <div class="info-item">
              <span class="icon">📍</span> <p>Milano, Hub operativo Dynamic Laboratories</p>
            </div>
            <div class="info-item">
              <span class="icon">📞</span> <p>Linea assistenza: +39 388 873 4479</p>
            </div>
            <div class="info-item">
              <span class="icon">✉️</span> <p>Email supporto: support&#64;dynamiclaboratories.it</p>
            </div>
          </div>
          
          <div class="mt-4 network-status">
            <p class="font-orbitron status-title">Stato servizio</p>
            <div class="progress-bar-bg"><div class="progress-bar-fill"></div></div>
            <p class="status-desc">99.98% operatività canali assistenza</p>
          </div>
        </div>
        
        <div class="col right-col">
          <form class="ticket-form glass-panel" (ngSubmit)="apriTicket($event)" #supportoForm="ngForm">
            <h2 class="font-orbitron mb-4">Apri ticket tecnico</h2>
            
            <div class="form-group">
              <label>Identificativo (Nome e Cognome)</label>
              <input type="text" name="nome" ngModel class="glass-input" required placeholder="Es. John Doe">
            </div>
            
            <div class="form-group">
              <label>Frequenza E-Mail</label>
              <input type="email" name="email" ngModel class="glass-input" required placeholder="nome@dominio.com">
            </div>
            
            <div class="form-group">
              <label>Modulo Danneggiato (Tipo Dispositivo)</label>
              <select class="glass-input" name="tipoModulo" ngModel required>
                <option value="hub">Dynamic Hub Centrale</option>
                <option value="vacuum">Robot Pulizia</option>
                <option value="cam">Sistema Sicurezza/Camera</option>
                <option value="other">Altro / Impianto Energia</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Log Anomalie (Descrizione del guasto)</label>
              <textarea class="glass-input" name="descrizione" ngModel rows="5" required placeholder="Descrivi in dettaglio l'avaria o l'anomalia rilevata..."></textarea>
            </div>
            
            <button type="submit" class="btn-main font-orbitron w-100 glow-purple" [disabled]="!supportoForm.valid" [class.disabled-btn]="!supportoForm.valid">TRASMETTI SEGNALE</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .support-container { padding-top: 100px; padding-bottom: var(--spacing-xl); min-height: 80vh; }
    .layout { display: flex; flex-direction: column; gap: var(--spacing-lg); }
    @media (min-width: 992px) { .layout { flex-direction: row; } }
    .col { flex: 1; }
    
    .left-col { padding: var(--spacing-xl); }
    .right-col { display: flex; flex-direction: column; }
    
    .text-gradient { font-size: 2.8rem; margin-bottom: 16px; letter-spacing: 1px; }
    .desc { color: var(--text-secondary); line-height: 1.6; font-size: 1.1rem; border-left: 3px solid var(--accent-cyan); padding-left: 16px; margin-bottom: 24px; }
    
    .info-item { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; color: var(--text-primary); }
    .icon { font-size: 1.5rem; }
    .mt-4 { margin-top: 32px; }
    .mb-4 { margin-bottom: 24px; }
    
    .network-status { border: 1px dashed rgba(70,175,122,0.36); padding: 16px; border-radius: 8px; background: rgba(8,24,16,0.72); }
    .status-title { font-size: 0.9rem; margin-bottom: 8px; color: var(--accent-cyan); }
    .progress-bar-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; margin-bottom: 8px; }
    .progress-bar-fill { width: 99.98%; height: 100%; background: linear-gradient(90deg, #b2ffd9 0%, #2ad989 100%); box-shadow: 0 0 10px rgba(39, 224, 143, 0.55); }
    .status-desc { font-size: 0.8rem; font-family: monospace; color: var(--text-secondary); }
    
    .ticket-form { padding: var(--spacing-xl); flex-grow: 1; border: 1px solid rgba(70,175,122,0.34); box-shadow: 0 0 30px rgba(39,224,143,0.1) inset; }
    .ticket-form h2 { font-size: 1.8rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 16px; }
    
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-secondary); font-family: 'Inter', sans-serif; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
    
    .glass-input { width: 100%; padding: 12px 16px; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 8px; color: white; font-family: 'Inter', sans-serif; transition: border-color 0.2s, box-shadow 0.2s; font-size: 1rem; }
    .glass-input:focus { outline: none; border-color: rgba(39,224,143,0.72); box-shadow: 0 0 10px rgba(39,224,143,0.2) inset; }
    select.glass-input { appearance: none; cursor: pointer; }
    select.glass-input option { background: var(--primary-dark); color: white; }
    textarea.glass-input { resize: vertical; min-height: 100px; }
    
    .w-100 { width: 100%; }
    .btn-main { padding: 16px; font-size: 1.1rem; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s; letter-spacing: 1px; font-weight: 700; color: white; }
    .glow-purple { background: linear-gradient(120deg, #effff7 0%, #8fffc3 44%, #2ad989 100%); color: #062514; }
    .glow-purple:hover { transform: translateY(-3px); box-shadow: 0 5px 25px rgba(39, 224, 143, 0.5); }
  `]
})
export class SupportoComponent {
  private toastService = inject(ToastService);

  apriTicket(event: Event) {
    event.preventDefault();
    this.toastService.showSuccess('Segnale di soccorso trasmesso! Un ingegnere ti contatterà entro 1 ciclo solare (24h).');
    (event.target as HTMLFormElement).reset();
  }
}

