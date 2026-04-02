import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';
import { Utente } from '../models/utente.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrazioneRequest {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  codiceRuolo?: string;
}

export interface AuthResponse {
  token: string;
  utente: Utente;
}

/**
 * Servizio per la gestione dell'autenticazione utente.
 * Mantiene lo stato dell'utente loggato usando i Signal di Angular.
 */
@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {
  private api = inject(ApiService);
  private readonly TOKEN_KEY = 'nova_auth_token';
  
  // Signal reattivo per lo stato dell'utente corrente
  public utenteCorrente = signal<Utente | null>(null);

  constructor() {
    this.caricaUtenteDaStorage();
  }

  /** Effettua il login e salva il token. */
  public login(credenziali: LoginRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/login', credenziali).pipe(
      tap(risposta => this.gestisciRispostaAuth(risposta))
    );
  }

  /** Registra un nuovo utente. */
  public registra(dati: RegistrazioneRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/register', dati).pipe(
      tap(risposta => this.gestisciRispostaAuth(risposta))
    );
  }

  /** Esegue il logout rimuovendo i dati locali. */
  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('nova_user_data');
    this.utenteCorrente.set(null);
  }

  /** Recupera il token salvato. */
  public get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Verifica se l'utente è attualmente autenticato. */
  public get isAutenticato(): boolean {
    return !!this.token;
  }

  private gestisciRispostaAuth(risposta: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, risposta.token);
    // Salviamo l'utente base in locale per ripristino refresh pagina
    localStorage.setItem('nova_user_data', JSON.stringify(risposta.utente));
    this.utenteCorrente.set(risposta.utente);
  }

  private caricaUtenteDaStorage(): void {
    const utenteSalvato = localStorage.getItem('nova_user_data');
    if (utenteSalvato && this.token) {
      this.utenteCorrente.set(JSON.parse(utenteSalvato));
    }
  }
}
