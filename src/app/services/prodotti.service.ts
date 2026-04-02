import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prodotto } from '../models/prodotto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private apiUrl = `${environment.apiUrl}/catalogo/prodotti`;

  constructor(private http: HttpClient) { }

  getProdotti(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(this.apiUrl);
  }

  getProdottoById(id: number): Observable<Prodotto> {
    return this.http.get<Prodotto>(`${this.apiUrl}/${id}`);
  }
}
