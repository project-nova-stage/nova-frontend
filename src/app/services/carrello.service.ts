import { Injectable, inject, signal, computed } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, tap } from "rxjs";

export interface CartItem {
  id?: number;
  quantita: number;
  prodottoId: number;
  prodottoNome?: string;
  prezzoUnitario?: number;
}

export interface CartResponse {
  id: number;
  utenteId: number;
  items: CartItem[];
  totale: number;
}

@Injectable({
  providedIn: "root"
})
export class CarrelloService {
  private api = inject(ApiService);

  private cartResponse = signal<CartResponse | null>(null);

  public items = computed(() => this.cartResponse()?.items || []);
  public totale = computed(() => this.cartResponse()?.totale || 0);

  public getCarrello(utenteId: number): Observable<CartResponse> {
    return this.api.get<CartResponse>(`/carrello/${utenteId}`).pipe(
      tap(res => this.cartResponse.set(res))
    );
  }

  public aggiungiProdotto(utenteId: number, prodottoId: number, quantita: number): Observable<CartResponse> {
    return this.api.post<CartResponse>(`/carrello/${utenteId}/items`, {
      prodottoId,
      quantita
    }).pipe(
      tap(res => this.cartResponse.set(res))
    );
  }

  public aggiornaQuantita(utenteId: number, prodottoId: number, quantita: number): Observable<CartResponse> {
    return this.api.put<CartResponse>(`/carrello/${utenteId}/items/${prodottoId}?quantita=${quantita}`, {}).pipe(
      tap(res => this.cartResponse.set(res))
    );
  }

  public rimuoviProdotto(utenteId: number, prodottoId: number): Observable<CartResponse> {
    return this.api.delete<CartResponse>(`/carrello/${utenteId}/items/${prodottoId}`).pipe(
      tap(res => this.cartResponse.set(res))
    );
  }

  public svuotaCarrello(utenteId: number): Observable<void> {
    return this.api.delete<void>(`/carrello/${utenteId}`).pipe(
      tap(() => this.cartResponse.set(null))
    );
  }
}
