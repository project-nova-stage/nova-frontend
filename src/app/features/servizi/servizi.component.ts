import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="servizi-container nova-container" data-aos="fade-up">
      <h1 class="font-orbitron text-gradient text-center mb-5">Servizi Smart Infrastructure</h1>
      <p class="subtitle text-center">Dal progetto alla messa in opera: impianti intelligenti con un look operativo moderno e misurabile.</p>
      
      <div class="services-grid">
        <div class="service-card glass-panel glow-on-hover">
          <div class="service-visual">
            <img src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=80" alt="Smart home residenziale" />
          </div>
          <h3 class="font-orbitron">Smart Home Residenziale</h3>
          <p>Impianto domotico per case e appartamenti: luci, clima, sicurezza e consumi in un'unica app.</p>
          <div class="price-tag">Pacchetto base da &euro;1.490</div>
        </div>
        
        <div class="service-card glass-panel glow-on-hover">
          <div class="service-visual">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Impianti per aziende" />
          </div>
          <h3 class="font-orbitron">Impianti per Aziende e Attività</h3>
          <p>Automazione per uffici, negozi e strutture B2B: accessi, monitoraggio ambientale, gestione energetica multi-zona.</p>
          <div class="price-tag">Da &euro;3.900 o su preventivo</div>
        </div>
        
        <div class="service-card glass-panel glow-on-hover">
          <div class="service-visual">
            <img src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80" alt="Impianti industriali" />
          </div>
          <h3 class="font-orbitron">Impianti Industriali</h3>
          <p>Progetti su larga scala con controllo impianti, dashboard KPI energetici e integrazione con processi produttivi.</p>
          <div class="price-tag">Solo su preventivo tecnico</div>
        </div>
      </div>
      
      <div class="cta-banner glass-panel mt-5">
        <h2>Costruiamo il tuo setup ideale</h2>
        <p>Analizziamo consumi, obiettivi e budget per proporti l'impianto giusto.</p>
        <button class="btn-main glow-purple font-orbitron">RICHIEDI PREVENTIVO</button>
      </div>
    </div>
  `,
  styles: [`
    .servizi-container { padding-top: 100px; padding-bottom: var(--spacing-xl); min-height: 80vh; }
    .text-center { text-align: center; }
    .mb-5 { margin-bottom: 3rem; font-size: 2.8rem; }
    .mt-5 { margin-top: 3rem; }
    .subtitle { margin: -24px auto 40px; max-width: 760px; color: var(--text-secondary); font-size: 1.08rem; line-height: 1.6; }
    
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-lg); }
    .service-card { padding: var(--spacing-xl); text-align: center; border: 1px solid rgba(79,176,128,0.25); display: flex; flex-direction: column; gap: 12px; }
    .service-visual { width: 100%; height: 180px; border-radius: 14px; overflow: hidden; margin-bottom: 8px; border: 1px solid rgba(79,176,128,0.25); }
    .service-visual img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.28s ease; }
    .service-card:hover .service-visual img { transform: scale(1.05); }
    .service-card h3 { color: var(--accent-cyan); margin-bottom: 16px; font-size: 1.5rem; }
    .service-card p { color: var(--text-secondary); line-height: 1.6; }
    .price-tag { margin-top: auto; font-weight: 700; color: var(--accent-cyan); background: rgba(39,224,143,0.12); border: 1px solid rgba(39,224,143,0.24); border-radius: 999px; padding: 8px 12px; display: inline-block; }
    
    .cta-banner { text-align: center; padding: 3rem var(--spacing-xl); border: 1px solid rgba(79,176,128,0.3); display: flex; flex-direction: column; align-items: center; gap: 24px; background: rgba(24,85,56,0.2); }
    .cta-banner h2 { font-size: 2rem; color: var(--text-primary); }
    .cta-banner p { color: var(--text-secondary); max-width: 700px; }
    .btn-main { padding: 16px 32px; font-size: 1rem; color: #062514; border: none; border-radius: 8px; cursor: pointer; background: linear-gradient(120deg, #f1fff8 0%, #90ffc4 44%, #2ad989 100%); transition: transform 0.2s, box-shadow 0.2s; }
    .btn-main:hover { transform: translateY(-3px); box-shadow: 0 5px 20px rgba(39, 224, 143, 0.46); }

    @media (max-width: 767px) {
      .servizi-container { padding-top: 92px; padding-bottom: 32px; }
      .mb-5 { font-size: 2rem; margin-bottom: 1.2rem; }
      .subtitle { margin: 0 auto 20px; font-size: 0.95rem; padding: 0 6px; }
      .services-grid { grid-template-columns: 1fr; gap: 14px; }
      .service-card { padding: 18px 14px; }
      .service-card h3 { font-size: 1.15rem; margin-bottom: 8px; }
      .service-card p { font-size: 0.92rem; }
      .price-tag { font-size: 0.86rem; }
      .cta-banner { padding: 22px 14px; gap: 12px; }
      .cta-banner h2 { font-size: 1.3rem; }
      .cta-banner p { font-size: 0.92rem; }
      .btn-main { width: 100%; }
    }
  `]
})
export class ServiziComponent {}
