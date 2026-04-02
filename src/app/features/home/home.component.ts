import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="home-page" data-aos="fade-in" data-aos-duration="700">      
      <div class="spline-background">
        <!-- Overlay to disable drag/click but allow hover/mousemove -->
        <div class="spline-drag-blocker"></div>
        <spline-viewer
          url="https://prod.spline.design/XY5B6ERRR3ETTEch/scene.splinecode"
          events-target="global"
        >
          <div class="mobile-fallback"></div>
        </spline-viewer>
      </div>

      <section class="hero-section nova-container">
        <div class="hero-content" data-aos="fade-right" data-aos-delay="100">   
          <p class="hero-chip">Domotic Laboratories · Domotica e Robotica</p>
          <h1>La tua casa.<br>Più intelligente di te.</h1>
          <p class="hero-subtitle">
            Un nuovo linguaggio visivo, una nuova esperienza: automazione, energia e sicurezza
            in un'unica regia elegante, fluida e interattiva.
          </p>

          <div class="hero-actions">
            <a routerLink="/prodotti" class="btn-primary">Entra nell'ecosistema</a>
            <a routerLink="/servizi" class="btn-secondary">Prenota consulenza</a>
          </div>

          <div class="hero-kpis" data-aos="fade-up" data-aos-delay="220">       
            <article>
              <h3>24/7</h3>
              <p>Controllo impianto</p>
            </article>
            <article>
              <h3>-30%</h3>
              <p>Ottimizzazione consumi</p>
            </article>
            <article>
              <h3>98%</h3>
              <p>Clienti soddisfatti</p>
            </article>
          </div>
        </div>
      </section>

      <section class="features-section nova-container">
        <div class="section-title text-center" data-aos="fade-up">
          <h2 class="font-orbitron title-solid">L'Ecosistema Perfetto</h2>
          <p class="text-secondary">Tutto ciò che ti serve per una casa connessa, sicura ed efficiente.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card glass-panel" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="28" height="28">
                <path d="M12 2.25l6 2v6.32c0 4.02-2.55 7.68-6 9.18-3.45-1.5-6-5.16-6-9.18V4.25l6-2zM8 6.02v4.55c0 2.96 1.74 5.77 4 7.1 2.26-1.33 4-4.14 4-7.1V6.02L12 4.9 8 6.02z" />
              </svg>
            </div>
            <h3>Sicurezza Avanzata</h3>
            <p>Telecamere e sensori che lavorano in sinergia per garantirti tranquillità h24. Ricevi notifiche istantanee ovunque tu sia.</p>
          </div>
          <div class="feature-card glass-panel" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="28" height="28">
                <path d="M13 2L5 14h5l-1 8 8-12h-5l1-8z" />
              </svg>
            </div>
            <h3>Risparmio Energetico</h3>
            <p>Termostati intelligenti e gestione smart dei carichi per abbattere i costi in bolletta senza rinunciare al comfort.</p>
          </div>
          <div class="feature-card glass-panel" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="28" height="28">
                <path d="M4 20l7-2 9-9-5-5-9 9-2 7zm10.5-13.5L17 9l-6.5 6.5-2.5.7.7-2.5L14.5 6.5z" />
                <path d="M19 3l2 2-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z" />
              </svg>
            </div>
            <h3>Automazione Totale</h3>
            <p>Crea scenari personalizzati: luci, tapparelle e clima si adattano automaticamente in base alle tue abitudini.</p>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="nova-container" data-aos="zoom-in">
          <div class="cta-box glass-panel">
            <h2 class="font-orbitron">Pronto ad evolvere la tua casa?</h2>
            <p>Inizia a costruire il tuo ecosistema smart step by step. Scopri il nostro catalogo o richiedi l'aiuto dell'intelligenza artificiale.</p>
            <div class="actions">
              <a routerLink="/prodotti" class="btn-main">Vai al Catalogo</a>
              <a routerLink="/ai-assistant" class="btn-outline">Scopri Assistente AI</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      position: relative;
      overflow-x: hidden;
      min-height: 100vh;
      padding-top: 70px;
    }

    .spline-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      pointer-events: auto;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mobile-fallback {
      display: none;
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: url('/assets/images/mobile-hero-fallback.webp') center/cover no-repeat;
      filter: brightness(0.6) contrast(1.1);
      z-index: 1;
    }

    spline-viewer {
      width: 120vw;
      height: 120vh;
      min-width: 1200px;
      min-height: 800px;
      filter: brightness(1.35) saturate(1.25) contrast(1.05);
      transform: scale(1.15);
      transform-origin: center center;
    }

    .hero-section {
      min-height: calc(100vh - 70px);
      display: flex;
      align-items: center;
      position: relative;
      z-index: 2;
      pointer-events: none;
    }

    .hero-content {
      max-width: 640px;
      padding: 40px 0;
      pointer-events: auto;
    }

    /* Invisible overlay to block user dragging without preventing hover */
    .spline-drag-blocker {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      cursor: default;
    }

    .hero-chip {
      margin: 0 0 16px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-size: 0.8rem;
      color: #35e596;
      font-weight: 700;
    }

    h1 {
      margin: 0;
      color: #eafff2;
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(2.4rem, 5.6vw, 4.4rem);
      line-height: 1.05;
      text-shadow: 0 0 26px rgba(39, 224, 143, 0.32);
    }

    .hero-subtitle {
      margin: 20px 0 0;
      color: #bcd9c9;
      line-height: 1.65;
      font-size: 1.05rem;
      max-width: 56ch;
    }

    .hero-actions {
      margin-top: 26px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn-primary,
    .btn-secondary {
      text-decoration: none;
      border-radius: 12px;
      padding: 13px 22px;
      font-weight: 700;
      font-size: 0.94rem;
      transition: 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .btn-primary {
      color: #032012;
      border: 1px solid rgba(180, 255, 217, 0.9);
      background: linear-gradient(115deg, #effff7 0%, #92ffc5 52%, #2ad989 100%);
      box-shadow: 0 10px 28px rgba(39, 224, 143, 0.24);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px rgba(39, 224, 143, 0.3);
    }

    .btn-secondary {
      color: #d9f2e6;
      border: 1px solid rgba(78, 175, 127, 0.7);
      background: rgba(5, 23, 15, 0.8);
    }
    .btn-secondary:hover {
      transform: translateY(-2px);
      background: rgba(7, 30, 19, 0.92);
    }

    .hero-kpis {
      margin-top: 30px;
      display: grid;
      grid-template-columns: repeat(3, minmax(120px, 1fr));
      gap: 12px;
      max-width: 560px;
    }
    .hero-kpis article {
      background: rgba(7, 25, 17, 0.8);
      border: 1px solid rgba(79, 176, 128, 0.36);
      border-radius: 12px;
      padding: 14px;
      backdrop-filter: blur(8px);
    }
    .hero-kpis h3 {
      margin: 0; color: #d9ffea; font-family: 'Orbitron', sans-serif; font-size: 1.4rem;
    }
    .hero-kpis p {
      margin: 4px 0 0; color: #9fc3af; font-size: 0.85rem;
    }

    /* Sections */
    .title-solid {
      color: #eafff2;
      font-size: 2.2rem;
      margin-bottom: 10px;
      text-shadow: 0 0 18px rgba(39, 224, 143, 0.4);
    }
    .features-section { padding: 60px 0; position: relative; z-index: 2; pointer-events: auto; }
    .section-title { margin-bottom: 40px; }

    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .feature-card { padding: 30px; border-radius: 16px; text-align: center; transition: transform 0.3s; }
    .feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(39, 224, 143, 0.15); }
    .feature-icon { width: 60px; height: 60px; margin: 0 auto 20px; background-color: rgba(39, 224, 143, 0.1); border-radius: 50%; border: 1px solid rgba(39, 224, 143, 0.3); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #2ad989;}
    .feature-card h3 { color: #eafff2; margin-bottom: 15px; font-family: 'Orbitron', sans-serif; }
    .feature-card p { color: #bcd9c9; font-size: 0.95rem; line-height: 1.6; }

    .cta-section { padding: 60px 0 100px; position: relative; z-index: 2; pointer-events: auto; }
    .cta-box { text-align: center; padding: 60px 30px; border-radius: 24px; background: linear-gradient(145deg, rgba(7, 25, 17, 0.9) 0%, rgba(3, 11, 7, 0.95) 100%); border: 1px solid rgba(39, 224, 143, 0.3); box-shadow: 0 0 50px rgba(39, 224, 143, 0.1); }
    .cta-box h2 { font-size: 2rem; color: #eafff2; margin-bottom: 15px; }
    .cta-box p { color: #bcd9c9; max-width: 600px; margin: 0 auto 30px; font-size: 1.1rem; line-height: 1.6; }
    .actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn-main { padding: 12px 28px; background: linear-gradient(115deg, #effff7 0%, #2ad989 100%); color: #032012; font-weight: 700; border-radius: 12px; text-decoration: none; transition: 0.3s; }
    .btn-main:hover { box-shadow: 0 10px 20px rgba(39, 224, 143, 0.25); transform: translateY(-2px); }
    .btn-outline { padding: 12px 28px; background: rgba(39, 224, 143, 0.05); border: 1px solid rgba(39, 224, 143, 0.5); color: #2ad989; font-weight: 700; border-radius: 12px; text-decoration: none; transition: 0.3s; }
    .btn-outline:hover { background: rgba(39, 224, 143, 0.15); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(39, 224, 143, 0.15); }

    @media (max-width: 1024px) {
      .spline-background { opacity: 0.8; height: 115vh; }
      spline-viewer { min-width: 1400px; transform: scale(1.2); }
      h1 { font-size: 3.2rem; }
      .hero-kpis { grid-template-columns: repeat(2, 1fr); margin-top: 20px; }
      .hero-content { padding-top: 20px; }
    }
    @media (max-width: 768px) {
      .home-page { padding-top: 40px; }
      .hero-content { padding-top: 10px; padding-bottom: 20px; }
      .mobile-fallback { display: block; }
      spline-viewer { display: none; }
      .hero-kpis { grid-template-columns: 1fr; }
      .cta-box { padding: 40px 20px; }
      h1 { font-size: 2.8rem; }
      .hero-subtitle { font-size: 0.95rem; }
      .features-grid { grid-template-columns: 1fr; }
      .hero-actions { display: flex; flex-direction: column; width: 100%; max-width: 320px; }
      .btn-primary, .btn-secondary { width: 100%; text-align: center; }
      .cta-box .actions { flex-direction: column; width: 100%; }
      .btn-main, .btn-outline { width: 100%; text-align: center; }
    }
    @media (max-width: 480px) {
      h1 { font-size: 2.2rem; }
    }
  `]
})
export class HomeComponent {}
