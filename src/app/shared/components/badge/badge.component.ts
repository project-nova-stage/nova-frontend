import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="colorClass">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .badge {
      display: inline-block;
      padding: 0.25em 0.6em;
      font-size: 0.75rem;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.375rem;
      letter-spacing: 0.5px;
    }
    
    .badge-cyan { background-color: rgba(109, 227, 255, 0.18); color: var(--accent-cyan); border: 1px solid rgba(109, 227, 255, 0.56); }
    .badge-purple { background-color: rgba(23, 166, 108, 0.2); color: #d7ffee; border: 1px solid rgba(39, 224, 143, 0.52); }
    .badge-gray { background-color: rgba(255, 255, 255, 0.1); color: var(--text-secondary); border: 1px solid var(--glass-border); }
  `]
})
export class BadgeComponent {
  @Input() color: 'cyan' | 'purple' | 'gray' = 'cyan';

  get colorClass() {
    return 'badge-' + this.color;
  }
}
