import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="particles-container">
      @for (p of particelle(); track p.id) {
        <div class="particle glow-cyan"
             [style.left.%]="p.x"
             [style.top.%]="p.y"
             [style.width.px]="p.size"
             [style.height.px]="p.size"
             [style.opacity]="p.opacity"
             [style.animation-duration.s]="p.duration"
             [style.animation-delay.s]="p.delay">
        </div>
      }
    </div>
  `,
  styles: [`
    .particles-container {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      overflow: hidden; pointer-events: none; z-index: 0;
    }
    .particle {
      position: absolute;
      border-radius: 50%;
      background: var(--accent-cyan);
      box-shadow: 0 0 10px var(--accent-cyan), 0 0 20px var(--accent-purple);
      animation: floatUp linear infinite;
    }
    @keyframes floatUp {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      10% { opacity: 0.8; }
      90% { opacity: 0.8; }
      100% { transform: translateY(-100vh) scale(0); opacity: 0; }
    }
  `]
})
export class ParticlesComponent implements OnInit, OnDestroy {
  particelle = signal<Particle[]>([]);
  private intervalId: any;

  ngOnInit() {
    this.generaParticelle(50);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private generaParticelle(totale: number) {
    const array: Particle[] = [];
    for (let i = 0; i < totale; i++) {
      array.push({
        id: i,
        x: Math.random() * 100,
        y: 100 + (Math.random() * 20),
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    this.particelle.set(array);
  }
}
