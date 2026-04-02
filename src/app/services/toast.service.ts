import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<ToastMessage[]>([]);
  public readonly toasts = this.toastsSignal.asReadonly();
  private counter = 0;

  add(message: string, type: ToastType = 'info', duration: number = 4000) {
    const id = ++this.counter;
    const newToast: ToastMessage = { id, message, type };
    
    this.toastsSignal.update(current => [...current, newToast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number) {
    this.toastsSignal.update(current => current.filter(t => t.id !== id));
  }

  showSuccess(message: string, duration?: number) {
    this.add(message, 'success', duration);
  }

  showError(message: string, duration?: number) {
    this.add(message, 'error', duration);
  }

  showInfo(message: string, duration?: number) {
    this.add(message, 'info', duration);
  }

  showWarning(message: string, duration?: number) {
    this.add(message, 'warning', duration);
  }
}
