import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { LucideAngularModule, CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toastService.toasts()" 
        class="toast-item glass-panel" 
        [ngClass]="'toast-' + toast.type"
        (click)="toastService.remove(toast.id)"
      >
        <div class="toast-icon">
          <lucide-icon *ngIf="toast.type === 'success'" name="check-circle-2" class="icon-success"></lucide-icon>
          <lucide-icon *ngIf="toast.type === 'error'" name="alert-circle" class="icon-error"></lucide-icon>
          <lucide-icon *ngIf="toast.type === 'info'" name="info" class="icon-info"></lucide-icon>
          <lucide-icon *ngIf="toast.type === 'warning'" name="alert-triangle" class="icon-warning"></lucide-icon>
        </div>
        <div class="toast-message">
          {{ toast.message }}
        </div>
        <button type="button" class="toast-close" aria-label="Chiudi notifica" (click)="toastService.remove(toast.id); $event.stopPropagation()">
            <lucide-icon name="x" size="16"></lucide-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none; /* Let clicks pass through container */
    }

    .toast-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      min-width: 300px;
      max-width: 450px;
      border-radius: 8px;
      pointer-events: auto; /* Re-enable clicks on the toast itself */
      animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      border-left: 4px solid transparent;
      padding-right: 40px;
      position: relative;
    }

    .toast-success { border-left-color: #10b981; background: rgba(16, 185, 129, 0.1); }
    .toast-error { border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
    .toast-warning { border-left-color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
    .toast-info { border-left-color: #3b82f6; background: rgba(59, 130, 246, 0.1); }

    .icon-success { color: #10b981; }
    .icon-error { color: #ef4444; }
    .icon-warning { color: #f59e0b; }
    .icon-info { color: #3b82f6; }

    .toast-message {
      font-family: 'Space Mono', monospace;
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.4;
      flex: 1;
    }

    .toast-close {
      position: absolute;
      right: 12px;
      top: 16px;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      padding: 0;
      transition: color 0.2s;
    }

    .toast-close:hover {
      color: white;
    }

    @keyframes slideIn {
      from { transform: translateX(100%) scale(0.9); opacity: 0; }
      to { transform: translateX(0) scale(1); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  public toastService = inject(ToastService);
}
