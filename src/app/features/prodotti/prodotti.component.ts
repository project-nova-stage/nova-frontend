import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/card/product-card.component';
import { Prodotto } from '../../models/prodotto.model';
import { ProdottiService } from '../../services/prodotti.service';
import { CarrelloService } from '../../services/carrello.service';
import { AutenticazioneService } from '../../services/autenticazione.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-prodotti',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, FormsModule],
  template: `
    <div class="prodotti-container container" data-aos="fade-up">
      <div class="page-header">
        <h1 class="font-orbitron text-gradient">Catalogo Dispositivi</h1>
        <p class="subtitle">Componenti e dispositivi per domotica, automazione e controllo energetico.</p>
      </div>
      
      <!-- Sezione Filtri logica e UX aggiornata -->
      <div class="filters glass-panel">
        <div class="search-bar">
          <input type="text" [(ngModel)]="searchQuery" (input)="applicaFiltri()" placeholder="Cerca Sensori, Hub..." class="input-glass">
        </div>
        
        <div class="filter-controls">
           <select [(ngModel)]="priceOrder" (change)="applicaFiltri()" class="input-glass select-glass">
              <option value="">Ordina per Prezzo</option>
              <option value="asc">Prezzo: Crescente</option>
              <option value="desc">Prezzo: Decrescente</option>
           </select>
        </div>

        <div class="category-pills">
          <button class="pill" [class.active]="selectedCategory === ''" (click)="selezionaCategoria('')">Tutti</button>
          <button class="pill" [class.active]="selectedCategory === 'Domotica'" (click)="selezionaCategoria('Domotica')">Domotica</button>
          <button class="pill" [class.active]="selectedCategory === 'Sensori'" (click)="selezionaCategoria('Sensori')">Sensori</button>
          <button class="pill" [class.active]="selectedCategory === 'Energia'" (click)="selezionaCategoria('Energia')">Energia</button>
        </div>
      </div>

      <!-- Griglia Prodotti -->
      <div class="products-grid">
        <ng-container *ngIf="loading">
          <div *ngFor="let it of [1,2,3,4,5,6,7,8]" class="skeleton-card glass-panel">
            <div class="skeleton skeleton-img"></div>
            <div class="skeleton-content">
              <div class="skeleton skeleton-text" style="width: 70%; height: 20px; margin-bottom: 10px;"></div>
              <div class="skeleton skeleton-text" style="width: 40%; height: 16px;"></div>
              <div class="skeleton skeleton-text" style="width: 30%; height: 24px; margin-top: 15px;"></div>
            </div>
          </div>
        </ng-container>
        <div *ngIf="!loading && prodottiFiltrati().length === 0" class="empty-state">
           <p>Nessun prodotto trovato. Prova altri filtri!</p>
        </div>

        @for (prod of prodottiFiltrati(); track prod.id) {
          <app-product-card 
            [prodotto]="prod"
            (viewDetails)="vaiAlDettaglio($event)"
            (addToCart)="aggiungiAlCarrello($event)">
          </app-product-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .prodotti-container {
      padding-top: 100px;
      padding-bottom: var(--spacing-xl);
      min-height: calc(100vh - 70px);
    }
    .page-header {
      margin-bottom: var(--spacing-lg);
      text-align: center;
    }
    .page-header h1 {
      font-size: 2.5rem; margin-bottom: 8px;
    }
    .subtitle {
      color: var(--text-secondary); font-size: 1.1rem;
    }
    
    .filters {
      padding: var(--spacing-md); margin-bottom: var(--spacing-lg);
      display: flex; flex-direction: column; gap: var(--spacing-md);
      background: rgba(7, 25, 17, 0.65);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.4);
    }
    @media (min-width: 768px) {
      .filters { flex-direction: row; align-items: center; justify-content: space-between; flex-wrap: wrap; }
    }
    .input-glass {
      width: 100%; min-width: 250px; padding: 10px 16px;
      font-family: 'Inter', sans-serif;
      background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border);
      color: var(--text-primary); border-radius: 8px; outline: none;
      transition: border-color var(--transition-fast);
    }
    .select-glass {
      cursor: pointer;
      min-width: 180px;
    }
    .select-glass option { background: #07110d; }
    .input-glass:focus {
      border-color: rgba(39,224,143,0.75);
      box-shadow: 0 0 0 2px rgba(39,224,143,0.16);
    }
    .category-pills {
      display: flex; gap: 8px; flex-wrap: wrap; flex-grow: 1; justify-content: flex-end;
    }
    .pill {
      background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
      color: var(--text-secondary); padding: 6px 16px; border-radius: 20px;
      cursor: pointer; transition: all var(--transition-fast);
      font-family: 'Inter', sans-serif; font-weight: 500;
    }
    .pill:hover, .pill.active {
      background: rgba(39, 224, 143, 0.2); border-color: rgba(39, 224, 143, 0.65);
      color: white; box-shadow: 0 0 10px rgba(39, 224, 143, 0.35);
    }

    .products-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--spacing-lg);
    }
    .loading-state, .empty-state { grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 40px; }
  `]
})
export class ProdottiComponent implements OnInit {
  prodottiBase: Prodotto[] = [];
  prodottiFiltrati = signal<Prodotto[]>([]);
  loading = true;

  // Filtri
  searchQuery = '';
  selectedCategory = '';
  priceOrder = '';

  constructor(
    private router: Router, 
    private prodottiService: ProdottiService,
    private carrelloService: CarrelloService,
    private authService: AutenticazioneService,
    private toastService: ToastService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        this.caricaProdottiDalServer();
    }
  }

  caricaProdottiDalServer() {
    this.loading = true;
    this.prodottiService.getProdotti().subscribe({
      next: (data) => {
        this.prodottiBase = data;
        this.applicaFiltri();
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore nel carimento prodotti', err);
        this.loading = false;
      }
    });
  }

  selezionaCategoria(catName: string) {
    this.selectedCategory = catName;
    this.applicaFiltri();
  }

  applicaFiltri() {
    let filtered = [...this.prodottiBase];

    // Filtro Ricerca
    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.nome.toLowerCase().includes(q) || p.descrizione?.toLowerCase().includes(q));
    }

    // Filtro Categoria
    if (this.selectedCategory !== '') {
      filtered = filtered.filter(p => p.categoria?.nome === this.selectedCategory);
    }

    // Ordinamento Prezzo
    if (this.priceOrder === 'asc') {
      filtered.sort((a, b) => a.prezzo - b.prezzo);
    } else if (this.priceOrder === 'desc') {
      filtered.sort((a, b) => b.prezzo - a.prezzo);
    }

    this.prodottiFiltrati.set(filtered);
  }

  vaiAlDettaglio(prod: Prodotto) {
    this.router.navigate(['/prodotti', prod.id]);
  }

  aggiungiAlCarrello(prod: Prodotto) {
    if (!this.authService.isAutenticato) {
      this.toastService.showWarning("Devi accedere al sistema per ordinare l'hardware.");
      return;
    }

    const utenteId = this.authService.utenteCorrente()?.id;
    if (!utenteId) {
       this.toastService.showError("Errore identificativo utente.");
       return;
    }

    this.carrelloService.aggiungiProdotto(utenteId, prod.id, 1).subscribe({
       next: () => {
         this.toastService.showSuccess(`Aggiunta 1 unità di ${prod.nome} al carrello.`);
       },
       error: (err) => {
         this.toastService.showError("Impossibile aggiungere il dispositivo al carrello.");
       }
    });
  }
}


