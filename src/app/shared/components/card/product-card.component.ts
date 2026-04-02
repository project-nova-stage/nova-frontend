import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prodotto } from '../../../models/prodotto.model';
import { BadgeComponent } from '../badge/badge.component';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';
    
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, BadgeComponent, LucideAngularModule],
  template: `
    <div class="product-card glass-panel glow-on-hover" (click)="onCardClick()">
      <div class="card-image-wrapper">
        <ng-container *ngIf="prodotto.immagini && prodotto.immagini.length > 0">
          <img [src]="prodotto.immagini[0].urlImmagine" [alt]="prodotto.nome" class="product-image">
        </ng-container>
        <ng-container *ngIf="!(prodotto.immagini && prodotto.immagini.length > 0)">
          <div class="product-image-fallback">Nessuna Immagine</div>
        </ng-container>
        <div class="card-badges">
          <app-badge *ngIf="prodotto.quantitaDisponibile > 0" color="cyan">Disponibile</app-badge>
          <app-badge *ngIf="prodotto.quantitaDisponibile <= 0" color="gray">Esaurito</app-badge>
        </div>
      </div>
      
      <div class="card-body">
        <h3 class="product-title font-orbitron">{{ prodotto.nome }}</h3>
        <p class="product-price text-gradient">€{{ prodotto.prezzo | number:'1.2-2' }}</p>
        
        <div class="card-actions">
          <button class="btn-primary-outline" (click)="onAddToCart($event)">
             <lucide-icon name="shopping-cart" [size]="18" style="margin-right: 6px;"></lucide-icon>
            Carrello
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      display: flex; flex-direction: column; overflow: hidden;
      cursor: pointer; height: 100%;
    }
    .card-image-wrapper {
      position: relative; width: 100%; aspect-ratio: 4/3;
      overflow: hidden; background: rgba(0,0,0,0.2);
    }
    .product-image {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform var(--transition-smooth);
    }
    .product-image-fallback {
      width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
      background: rgba(39, 224, 143, 0.05); color: var(--text-secondary);
      font-size: 0.9rem; font-style: normal;
    }
    .product-card:hover .product-image {
      transform: scale(1.05);
    }
    .card-badges {
      position: absolute; top: 12px; right: 12px;
      display: flex; gap: 8px;
    }
    .card-body {
      padding: var(--spacing-md); display: flex; flex-direction: column; flex-grow: 1;
    }
    .product-title {
      font-size: 1.1rem; margin-bottom: 8px; color: var(--text-primary);
    }
    .product-price {
      font-size: 1.4rem; font-weight: 700; margin-bottom: var(--spacing-md);
    }
    .card-actions {
      margin-top: auto;
    }
    .btn-primary-outline {
      width: 100%; padding: 10px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      background: transparent; border: 1px solid var(--accent-cyan);
      color: var(--accent-cyan); font-weight: 600; cursor: pointer;
      transition: all var(--transition-fast);
    }
    .btn-primary-outline:hover {
      background: var(--accent-cyan); color: var(--primary-dark);
      box-shadow: 0 0 15px rgba(39, 224, 143, 0.4);
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) prodotto!: Prodotto;
  @Output() addToCart = new EventEmitter<Prodotto>();
  @Output() viewDetails = new EventEmitter<Prodotto>();

  onAddToCart(event: Event) {
    event.stopPropagation(); // Avoid triggering card click
    this.addToCart.emit(this.prodotto);
  }

  onCardClick() {
    this.viewDetails.emit(this.prodotto);
  }
}
