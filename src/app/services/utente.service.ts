import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente.model';

/**
 * Servizio per operazioni specifiche legate al profilo Utente
 * diverse da Login o Registrazione.
 */
@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private api = inject(ApiService);

  /** Recupera il profilo completo dell'utente corrente. */
  public recuperaProfilo(): Observable<Utente> {
    return this.api.get<Utente>('/utenti/me');
  }

  /** Aggiorna il profilo dell'utente. */
  public aggiornaProfilo(datiAggiornati: Partial<Utente>): Observable<Utente> {
    return this.api.put<Utente>('/utenti/me', datiAggiornati);
  }
}
