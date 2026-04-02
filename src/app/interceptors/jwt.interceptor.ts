import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AutenticazioneService } from '../services/autenticazione.service';
import { Router } from '@angular/router';

/**
 * Intercettore per le chiamate HTTP (Angular 18+ Functional Interceptor).
 * Aggiunge automaticamente il JWT Token agli header se l'utente è loggato.
 * Gestisce l'errore 401 (Non autorizzato) disconnettendo l'utente.
 */
export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  
  const authService = inject(AutenticazioneService);
  const router = inject(Router);
  const token = authService.token;

  let requestDaInviare = req;

  // Se abbiamo il token, lo cliniamo nella richiesta
  if (token) {
    requestDaInviare = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(requestDaInviare).pipe(
    catchError((errore: HttpErrorResponse) => {
      // Se il token è scaduto o invalido, facciamo logout
      if (errore.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => errore);
    })
  );
};
