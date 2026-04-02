import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Prodotto } from '../../models/prodotto.model';
import { ProdottiService } from '../../services/prodotti.service';
import { CarrelloService } from '../../services/carrello.service';
import { AutenticazioneService } from '../../services/autenticazione.service';
import { ToastService } from '../../services/toast.service';
import { LucideAngularModule, LogIn, ShoppingCart, Loader2 } from 'lucide-angular';

@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    LucideAngularModule
  ],
  template: `
    <div class="dettaglio-container nova-container" data-aos="fade-up">

      <ng-container *ngIf="isLoading()">
        <div class="product-grid mt-4">
          <div class="image-gallery glass-panel skeleton skeleton-img" style="aspect-ratio: 1; height: 100%;"></div>
          <div class="product-info">
            <div class="skeleton skeleton-text" style="width: 70%; height: 32px; margin-bottom: 8px;"></div>
            <div class="skeleton skeleton-text" style="width: 30%; height: 20px; margin-bottom: 24px;"></div>
            <div class="skeleton skeleton-text" style="width: 40%; height: 40px; margin-bottom: 30px;"></div>
            <div class="skeleton skeleton-text" style="width: 100%; height: 60px; margin-bottom: 30px;"></div>
            
            <div class="skeleton skeleton-text" style="width: 100%; height: 60px; border-radius: 12px;"></div>
          </div>
        </div>
      </ng-container>

      <ng-container *ngIf="!isLoading() && errorMessage()">
        <div class="glass-panel text-center mt-4">
          <p class="text-secondary">{{ errorMessage() }}</p>
          <button class="btn-secondary mt-3" routerLink="/prodotti">Torna al Catalogo</button>
        </div>
      </ng-container>

      <ng-container *ngIf="!isLoading() && prodotto(); let p">
        <div class="breadcrumb">
          <a routerLink="/prodotti" class="text-gradient">Prodotti</a> &gt; {{ p.categoria.nome }} &gt; {{ p.nome }}
        </div>

        <div class="product-grid">
          <!-- Immagine Olografica Mock -->
          <div class="image-gallery glass-panel">
            <div class="hologram-effect">
              <ng-container *ngIf="p.immagini && p.immagini.length > 0; else noImage">
                <img [src]="p.immagini[0].urlImmagine" [alt]="p.nome" />
              </ng-container>
              <ng-template #noImage>
                <div class="no-image-placeholder">Nessuna immagine disponibile.</div>
              </ng-template>
              <div class="scanline"></div>
            </div>
          </div>

          <!-- Dettagli -->
          <div class="product-info">
            <h1 class="font-orbitron">{{ p.nome }}</h1>
            <p class="sku text-secondary">SKU: {{ p.sku }}</p>
            <h2 class="price text-gradient">&euro;{{ p.prezzo | number:'1.2-2' }}</h2>

            <p class="description">
              {{ p.descrizione || "Un concentrato di tecnologia progettato specificamente per integrarsi nell'ecosistema Dynamic Laboratories. Garantisce performance eccezionali e sicurezza totale dei dati." }}
            </p>

            <div class="status-box">
              <span class="dot" [class.available]="p.quantitaDisponibile > 0"></span>
              <span class="status-text">{{ p.quantitaDisponibile > 0 ? 'Disponibile per la spedizione immediata' : 'Attualmente Esaurito' }}</span>
            </div>

            <div class="actions">
              <div class="qty-selector glass-panel">
                <button (click)="changeQty(-1)">-</button>
                <span class="font-mono">{{ qty() }}</span>
                <button (click)="changeQty(1)" [disabled]="qty() >= p.quantitaDisponibile" [class.disabled-btn]="qty() >= p.quantitaDisponibile">+</button>
              </div>
              <button class="btn-main glow-cyan d-flex-center" 
                      [disabled]="p.quantitaDisponibile <= 0 || isAddingToCart()" 
                      [class.disabled-btn]="p.quantitaDisponibile <= 0 || isAddingToCart()"
                      (click)="addToCart(p)">
                <ng-container *ngIf="!isAddingToCart()">
                  <lucide-icon name="shopping-cart" [size]="18" class="me-2"></lucide-icon> AGGIUNGI
                </ng-container>
                <ng-container *ngIf="isAddingToCart()">
                  <lucide-icon name="loader-2" [size]="18" class="spinner-icon me-2"></lucide-icon> CARICAMENTO...
                </ng-container>
              </button>
            </div>

            <div class="help-text mt-2 text-secondary" style="font-size: 0.85rem;" *ngIf="!isAutenticato">
              <lucide-icon name="log-in" [size]="14" style="vertical-align: middle;"></lucide-icon> Devi effettuare l'accesso per ordinare.
            </div>

            <div class="specs mt-5" *ngIf="p.specifiche && p.specifiche.length > 0">
              <h3 class="font-orbitron">Specifiche Tecniche</h3>
              <ul class="specs-list">
                <li *ngFor="let spec of p.specifiche">
                  <span class="spec-label">{{ spec.etichetta }}</span>
                  <span class="spec-value">{{ spec.valore }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .dettaglio-container { padding-top: 100px; padding-bottom: var(--spacing-xl); min-height: 80vh; }
    .breadcrumb { margin-bottom: 30px; font-size: 0.95rem; color: var(--text-secondary); }
    .breadcrumb a { text-decoration: none; font-weight: 500; font-family: 'Orbitron', sans-serif; }
    
    .product-grid { display: grid; grid-template-columns: 1fr; gap: var(--spacing-xl); }
    @media (min-width: 992px) { .product-grid { grid-template-columns: 1fr 1fr; align-items: start; } }

    .image-gallery { position: relative; overflow: hidden; padding: 20px; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
    .hologram-effect { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    img { max-width: 100%; max-height: 100%; object-fit: contain; filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.4)); animation: pulse-img 4s ease-in-out infinite alternate; z-index: 2; }
    .no-image-placeholder { color: var(--text-secondary); text-align: center; }
    
    .scanline { position: absolute; width: 100%; height: 100px; background: linear-gradient(to bottom, transparent, rgba(0,229,255,0.2), transparent); top: -100px; animation: scan 6s linear infinite; z-index: 3; pointer-events: none; }
    
    @keyframes pulse-img { 0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.3)); } 100% { transform: scale(1.02); filter: drop-shadow(0 0 30px rgba(0, 229, 255, 0.6)); } }
    @keyframes scan { 0% { top: -100px; } 100% { top: 100%; } }

    .product-info h1 { font-size: 2.4rem; margin-bottom: 8px; line-height: 1.1; }
    .sku { font-family: 'Inter', sans-serif; font-size: 0.85rem; letter-spacing: 1px; margin-bottom: 24px; text-transform: uppercase; }
    .price { font-size: 2.8rem; margin-bottom: 24px; }
    .description { color: var(--text-primary); font-size: 1.1rem; line-height: 1.6; margin-bottom: 32px; font-weight: 300; }

    .status-box { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 8px; border-left: 3px solid var(--text-secondary); }
    .status-box:has(.available) { border-left-color: var(--accent-cyan); background: rgba(0,229,255,0.05); }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--text-secondary); box-shadow: 0 0 8px var(--text-secondary); }
    .dot.available { background: var(--accent-cyan); box-shadow: 0 0 12px var(--accent-cyan); animation: pulse-dot 2s infinite; }
    @keyframes pulse-dot { 0% { opacity: 0.6; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0.6; transform: scale(0.9); } }
    .status-text { font-weight: 500; font-size: 0.95rem; }

    .actions { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 32px; }
    .qty-selector { display: flex; align-items: center; height: 50px; border-radius: 12px; padding: 0; overflow: hidden; }
    .qty-selector button { width: 50px; height: 100%; background: transparent; border: none; color: var(--text-primary); font-size: 1.2rem; cursor: pointer; transition: background 0.2s; }
    .qty-selector button:hover:not(:disabled) { background: rgba(255,255,255,0.1); }
    .qty-selector span { width: 40px; text-align: center; font-weight: 600; font-size: 1.1rem; }
    .btn-main { height: 50px; font-weight: 600; letter-spacing: 1px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; flex: 1; min-width: 250px; }

    .d-flex-center { display: flex; align-items: center; justify-content: center; text-transform: uppercase; }
    .me-2 { margin-right: 8px; }

    .specs h3 { margin-bottom: 20px; font-size: 1.4rem; color: var(--accent-purple); }
    .specs-list { list-style: none; padding: 0; }
    .specs-list li { display: flex; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .spec-label { flex: 0 0 150px; color: var(--text-secondary); }
    .spec-value { flex: 1; font-weight: 500; }
  `]
})
export class DettaglioProdottoComponent implements OnInit {
  prodotto = signal<Prodotto | null>(null);
  qty = signal<number>(1);
  isLoading = signal<boolean>(true);
  isAddingToCart = signal<boolean>(false);
  errorMessage = signal<string>('');

  private route = inject(ActivatedRoute);
  private prodottiService = inject(ProdottiService);
  private carrelloService = inject(CarrelloService);
  private authService = inject(AutenticazioneService);
  private toastService = inject(ToastService);

  get isAutenticato() { return this.authService.isAutenticato; }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.caricaProdotto(id);
    });
  }

  caricaProdotto(id: string | null) {
    if(!id) return;
    
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.prodottiService.getProdottoById(Number(id)).subscribe({
      next: (prod) => {
        this.prodotto.set(prod);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Errore recupero prodotto:", err);
        this.errorMessage.set(err.status === 404 ? "Prodotto non trovato nel catalogo." : "Errore di rete durante il caricamento del prodotto.");
        this.isLoading.set(false);
      }
    });
  }

  changeQty(amount: number) {
    const p = this.prodotto();
    if (!p) return;
    const newVal = this.qty() + amount;
    if (newVal >= 1 && newVal <= (p.quantitaDisponibile || 1)) { 
      this.qty.set(newVal);
    }
  }

  addToCart(prod: Prodotto) {
    if (!this.isAutenticato) {
      this.toastService.showWarning("Devi accedere al sistema per ordinare l'hardware.");
      return;
    }

    const utenteId = this.authService.utenteCorrente()?.id;
    if (!utenteId) {
       this.toastService.showError("Errore identificativo utente.");
       return;
    }

    this.isAddingToCart.set(true);
    
    this.carrelloService.aggiungiProdotto(utenteId, prod.id, this.qty()).subscribe({
       next: () => {
         this.toastService.showSuccess(`Aggiunte ${this.qty()} unità di ${prod.nome} al carrello.`);
         this.isAddingToCart.set(false);
       },
       error: (err) => {
         this.toastService.showError("Impossibile aggiungere il dispositivo al carrello.");
         this.isAddingToCart.set(false);
       }
    });
  }
}

