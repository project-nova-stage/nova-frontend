import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Servizio base generico per la comunicazione con il backend Spring Boot.
 * Astrae la gestione dell'URL di base e fornisce metodi CRUD standard.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  /** Esegue una richiesta GET. */
  public get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { params });
  }

  /** Esegue una richiesta POST. */
  public post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  /** Esegue una richiesta PUT. */
  public put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body);
  }

  /** Esegue una richiesta PATCH. */
  public patch<T>(path: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body);
  }

  /** Esegue una richiesta DELETE. */
  public delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }
}
