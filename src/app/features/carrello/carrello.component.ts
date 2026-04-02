import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutenticazioneService } from '../../services/autenticazione.service';  
import { CarrelloService } from '../../services/carrello.service';
import { ToastService } from '../../services/toast.service';
import { LucideAngularModule, ShoppingCart, Trash2, CreditCard, Package } from 'lucide-angular';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="cart-container container" data-aos="fade-up">
      <div class="cart-header">
        <h1 class="font-orbitron"><lucide-icon name="shopping-cart" class="cyan"></lucide-icon> Carrello Operativo</h1>
      </div>

      <div *ngIf="isLoading" class="loading-state">
        <p class="muted">Sincronizzazione scorte in corso...</p>
      </div>

      <ng-container *ngIf="!isLoading">
        <div *ngIf="carrelloService.items().length === 0" class="empty-cart glass-panel">
          <lucide-icon name="package" size="48" class="muted"></lucide-icon>    
          <h2 class="font-orbitron">Carrello Vuoto</h2>
          <p class="muted">Nessun hardware o licenza selezionata per l'ordine.</p>
          <a routerLink="/prodotti" class="btn-primary mt-3">Esplora Moduli</a> 
        </div>

        <div *ngIf="carrelloService.items().length > 0" class="cart-layout">    
          <!-- Lista Articoli -->
          <div class="cart-items">
            <div class="cart-item glass-panel" *ngFor="let item of carrelloService.items()">
              <div class="item-info">
                <h3 class="font-orbitron text-cyan">{{ item.prodottoNome || ('Prodotto #' + item.prodottoId) }}</h3>
                <p class="price font-mono">€{{ item.prezzoUnitario || 0 | number:'1.2-2' }}</p>
              </div>

              <div class="item-actions">
                <div class="qty-controls">
                  <button class="btn-icon" (click)="updateQty(item, -1)" [disabled]="item.quantita <= 1">-</button>
                  <span class="qty-display font-mono">{{ item.quantita }}</span>
                  <button class="btn-icon" (click)="updateQty(item, 1)">+</button>
                </div>
                <button class="btn-danger btn-icon-only" (click)="removeItem(item.prodottoId)" title="Rimuovi">
                  <lucide-icon name="trash-2" size="18"></lucide-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Checkout Panel -->
          <div class="checkout-panel glass-panel">
            <h2 class="font-orbitron">Riepilogo Ordine</h2>
            <div class="summary-row">
              <span class="muted">Subtotale:</span>
              <span class="font-mono">€{{ carrelloService.totale() | number:'1.2-2' }}</span>
            </div>
            <div class="summary-row mt-2">
              <span class="muted">Tasse (IVA 22%):</span>
              <span class="font-mono">€{{ (carrelloService.totale() * 0.22) | number:'1.2-2' }}</span>
            </div>

            <div class="divider"></div>

            <div class="summary-row total-row">
              <span class="text-cyan">TOTALE:</span>
              <span class="text-cyan font-bold font-mono">€{{ (carrelloService.totale() * 1.22) | number:'1.2-2' }}</span>
            </div>

            <button class="btn-primary w-100 mt-4 checkout-btn" (click)="procediAlCheckout()">
              <lucide-icon name="credit-card" size="18"></lucide-icon> PROCEDI AL CHECKOUT
            </button>
            <button class="btn-secondary w-100 mt-2" (click)="svuotaCarrello()">
              SVUOTA CARRELLO
            </button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .cart-container { padding-top: 120px; padding-bottom: 80px; min-height: 80vh; }
    .cart-header { margin-bottom: 30px; border-bottom: 1px solid rgba(0, 229, 255, 0.2); padding-bottom: 15px; }
    .cart-header h1 { display: flex; align-items: center; gap: 15px; text-transform: uppercase; font-size: 2.2rem; }
    .cyan { color: #00e5ff; }
    .text-cyan { color: #00e5ff; }
    .muted { color: var(--text-secondary); }
    .font-mono { font-family: 'Space Mono', monospace; }
    .loading-state, .empty-cart { text-align: center; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; gap: 15px; }

    .cart-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; align-items: start; }
    @media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } }  

    .cart-items { display: flex; flex-direction: column; gap: 15px; }
    .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-left: 3px solid #00e5ff; }
    .item-info .price { font-size: 1.2rem; margin-top: 5px; opacity: 0.9; }     

    .item-actions { display: flex; align-items: center; gap: 20px; }
    .qty-controls { display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 5px; }
    .btn-icon { background: none; border: none; color: white; width: 30px; height: 30px; font-size: 1.2rem; cursor: pointer; transition: color 0.2s; }
    .btn-icon:hover:not([disabled]) { color: #00e5ff; }
    .btn-icon[disabled] { opacity: 0.3; cursor: not-allowed; }
    .qty-display { min-width: 30px; text-align: center; font-weight: bold; }    

    .btn-danger { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; border-radius: 8px; padding: 8px; cursor: pointer; transition: all 0.2s; }
    .btn-danger:hover { background: rgba(239, 68, 68, 0.2); transform: scale(1.05); }

    .checkout-panel { padding: 25px; position: sticky; top: 100px; }
    .summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; }
    .divider { height: 1px; background: rgba(255,255,255,0.1); margin: 20px 0; }
    .total-row { font-size: 1.4rem; }
    .checkout-btn { display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: bold; letter-spacing: 1px; padding: 15px; }
    .w-100 { width: 100%; }
    .mt-2 { margin-top: 10px; }
    .mt-3 { margin-top: 15px; }
    .mt-4 { margin-top: 20px; }
  `]
})
export class CarrelloComponent implements OnInit {
  public carrelloService = inject(CarrelloService);
  private authService = inject(AutenticazioneService);
  private toastService = inject(ToastService);
  isLoading = false;

  ngOnInit() {
    this.caricaCarrello();
  }

  caricaCarrello() {
    const utenteId = this.authService.utenteCorrente()?.id;
    if (!utenteId) return;

    this.isLoading = true;
    this.carrelloService.getCarrello(utenteId).subscribe({
      next: () => this.isLoading = false,
      error: (err) => {
        this.toastService.showError("Errore di rete durante il caricamento del carrello.");
        this.isLoading = false;
      }
    });
  }

  updateQty(item: any, change: number) {
    const utenteId = this.authService.utenteCorrente()?.id;
    if (!utenteId) return;
    const nuovaQuantita = item.quantita + change;
    if (nuovaQuantita > 0) {
      this.carrelloService.aggiornaQuantita(utenteId, item.prodottoId, nuovaQuantita).subscribe({
        next: () => this.toastService.showSuccess(`Quantità aggiornata: ${nuovaQuantita}`),
        error: (err) => this.toastService.showError("Errore durante l'aggiornamento della quantità.")
      });
    }
  }

  removeItem(prodottoId: number) {
    const utenteId = this.authService.utenteCorrente()?.id;
    if (!utenteId) return;
    this.carrelloService.rimuoviProdotto(utenteId, prodottoId).subscribe({
      next: () => this.toastService.showSuccess("Modulo rimosso dal carrello."),
      error: (err) => this.toastService.showError("Impossibile rimuovere l'hardware selezionato.")
    });     
  }

  svuotaCarrello() {
    const utenteId = this.authService.utenteCorrente()?.id;
    if (!utenteId) return;
    if(confirm('Sei sicuro di voler svuotare il carrello?')) {
      this.carrelloService.svuotaCarrello(utenteId).subscribe({
        next: () => this.toastService.showInfo("Carrello svuotato con successo."),
        error: (err) => this.toastService.showError("Errore durante l'operazione.")
      });
    }
  }

  procediAlCheckout() {
    this.toastService.showWarning("Simulazione: Checkout elaborato offline in questa demo.");
    const utenteId = this.authService.utenteCorrente()?.id;
    if (utenteId) {
      this.carrelloService.svuotaCarrello(utenteId).subscribe();
    }
  }
}
