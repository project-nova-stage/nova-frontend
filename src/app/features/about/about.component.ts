import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container nova-container" data-aos="fade-up">
      <div class="hero-about">
        <h1 class="font-orbitron text-gradient title-glow">Living Systems, real world.</h1>
        <p class="subtitle mt-3">Un team tecnico che unisce design digitale e impianti smart per casa, business e strutture evolute.</p>
      </div>

      <div class="mission-section glass-panel">
        <div class="mission-content">
          <h2 class="font-orbitron">La nostra Direzione</h2>
          <p>
            Realizziamo sistemi affidabili per il controllo di luci, clima, sicurezza e consumi.
            Alcuni dispositivi integrano funzioni AI proprietarie per suggerimenti e assistenza,
            mentre la sicurezza dell'infrastruttura e il monitoraggio operativo sono gestiti dal nostro team tecnico.
          </p>
          <div class="stats mt-4">
            <div class="stat"><span class="highlight text-gradient">24/7</span><br>Monitoraggio impianti</div>
            <div class="stat"><span class="highlight text-gradient-purple">-30%</span><br>Consumi medi ottimizzati</div>
            <div class="stat"><span class="highlight text-gradient-yellow">3 linee</span><br>Casa, Business, Industria</div>
          </div>
        </div>
        
        <!-- Robot assistant animation -->
        <div class="abstract-visual">
          <div class="robot-stage">
            <div class="robot floating-bot">
              <div class="robot-head">
                <div class="eye"></div>
                <div class="eye"></div>
              </div>
              <div class="robot-body"></div>
              <div class="arm arm-left"></div>
              <div class="arm arm-right"></div>
              <div class="wheel wheel-left"></div>
              <div class="wheel wheel-right"></div>
            </div>
            <div class="signal-rings">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>

      <div class="team-section mt-5 glass-panel">
        <h2 class="font-orbitron text-center mb-5">Il nostro manifesto</h2>
        <div class="vision-grid">
          <div class="vision-card">
            <div class="vision-icon">&#9889;</div>
            <h3>Efficienza Cinetica</h3>
            <p>Ottimizzazione dei consumi in tempo reale con scenari automatici su clima, luci e carichi elettrici.</p>
          </div>
          <div class="vision-card">
            <div class="vision-icon">&#128373;</div>
            <h3>Sicurezza Operativa</h3>
            <p>Controllo accessi, aggiornamenti e monitoraggio continuo dell'infrastruttura dispositivi gestiti dal team interno.</p>
          </div>
          <div class="vision-card">
            <div class="vision-icon">&#127760;</div>
            <h3>Scalabilità Universale</h3>
            <p>Dal bilocale all'impianto industriale: piattaforma modulare e integrazione con protocolli IoT standard.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container { padding-top: 120px; padding-bottom: 80px; min-height: 100vh; position: relative; perspective: 1000px; }
    
    .hero-about { text-align: center; margin-bottom: 80px; }
    .title-glow { font-size: 3.5rem; text-shadow: 0 0 40px rgba(39,224,143,0.35); animation: breathe 4s ease-in-out infinite alternate; }
    .subtitle { color: var(--text-secondary); max-width: 700px; margin: 0 auto; font-size: 1.25rem; line-height: 1.6; }
    
    .mt-3 { margin-top: 1rem; } .mt-4 { margin-top: 2rem; } .mt-5 { margin-top: 4rem; } .mb-5 { margin-bottom: 3rem; }

    .mission-section { 
      display: flex; flex-direction: column; gap: 40px; padding: 50px; 
      align-items: center; border-radius: 24px; position: relative; overflow: hidden;
      border: 1px solid rgba(39,224,143,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }
    @media (min-width: 992px) { .mission-section { flex-direction: row; } }
    
    .mission-content { flex: 1; z-index: 2; }
    .mission-content h2 { margin-bottom: 24px; font-size: 2.2rem; color: var(--text-primary); }
    .mission-content p { color: var(--text-secondary); line-height: 1.8; margin-bottom: 30px; font-size: 1.1rem; }
    
    .stats { display: flex; gap: 30px; flex-wrap: wrap; }
    .stat { font-family: 'Inter', sans-serif; color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; font-weight: 600; }
    .highlight { font-size: 2.5rem; font-weight: 800; font-family: 'Orbitron', sans-serif; display: block; margin-bottom: 4px; }
    .text-gradient-purple { color: var(--accent-purple); text-shadow: 0 0 15px rgba(39,224,143,0.35); }
    .text-gradient-yellow { color: #EAB308; text-shadow: 0 0 15px rgba(234,179,8,0.4); }

    /* Robot animation */
    .abstract-visual { flex: 1; display: flex; justify-content: center; align-items: center; min-height: 300px; }
    .robot-stage { position: relative; width: 320px; height: 320px; display: flex; justify-content: center; align-items: center; }
    .robot { position: relative; width: 170px; height: 190px; }
    .robot-head { width: 120px; height: 72px; margin: 0 auto; border-radius: 18px; background: linear-gradient(135deg, rgba(39,224,143,0.25), rgba(23,166,108,0.25)); border: 1px solid rgba(255,255,255,0.2); display: flex; justify-content: center; align-items: center; gap: 16px; }
    .eye { width: 12px; height: 12px; border-radius: 50%; background: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan); animation: blink 3s infinite; }
    .robot-body { width: 140px; height: 88px; margin: 10px auto 0; border-radius: 16px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); }
    .arm { position: absolute; top: 88px; width: 16px; height: 56px; background: rgba(255,255,255,0.15); border-radius: 10px; }
    .arm-left { left: 2px; transform-origin: top center; animation: wave-left 2.4s ease-in-out infinite; }
    .arm-right { right: 2px; transform-origin: top center; animation: wave-right 2.4s ease-in-out infinite; }
    .wheel { position: absolute; bottom: 0; width: 34px; height: 34px; border-radius: 50%; border: 3px solid rgba(39,224,143,0.5); }
    .wheel-left { left: 42px; }
    .wheel-right { right: 42px; }
    .floating-bot { animation: bob 4s ease-in-out infinite; }

    .signal-rings { position: absolute; width: 100%; height: 100%; pointer-events: none; }
    .signal-rings span { position: absolute; inset: 20%; border: 1px dashed rgba(39,224,143,0.25); border-radius: 50%; animation: pulse-ring 4s linear infinite; }
    .signal-rings span:nth-child(2) { inset: 12%; animation-delay: 1.2s; }
    .signal-rings span:nth-child(3) { inset: 4%; animation-delay: 2.4s; }

    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes wave-left { 0%,100% { transform: rotate(12deg); } 50% { transform: rotate(-14deg); } }
    @keyframes wave-right { 0%,100% { transform: rotate(-12deg); } 50% { transform: rotate(14deg); } }
    @keyframes blink { 0%, 45%, 55%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.1); } }
    @keyframes pulse-ring { 0% { opacity: 0.1; transform: scale(0.92); } 50% { opacity: 0.35; } 100% { opacity: 0.05; transform: scale(1.08); } }
    @keyframes breathe { 0% { opacity: 0.8; } 100% { opacity: 1; transform: scale(1.02); } }

    /* vision section */
    .team-section { padding: 60px; border-radius: 24px; text-align: center; }
    .vision-grid { display: grid; gap: 30px; grid-template-columns: 1fr; }
    @media (min-width: 768px) { .vision-grid { grid-template-columns: repeat(3, 1fr); } }
    
    .vision-card { padding: 30px; background: rgba(0,0,0,0.2); border-radius: 16px; transition: transform 0.3s; border: 1px solid rgba(255,255,255,0.02); }
    .vision-card:hover { transform: translateY(-10px); background: rgba(0,0,0,0.4); border-color: rgba(39,224,143,0.24); }
    .vision-icon { font-size: 2.5rem; margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(39,224,143,0.4)); }
    .vision-card h3 { font-size: 1.25rem; margin-bottom: 12px; color: var(--text-primary); }
    .vision-card p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; }
  `]
})
export class AboutComponent {}

