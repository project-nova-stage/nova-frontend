import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticazioneService } from '../services/autenticazione.service';

/**
 * Guard per proteggere le rotte che richiedono il login.
 * Usa il modello funzionale di Angular 18+.
 */
export const AutenticazioneGuard: CanActivateFn = () => {
  const authService = inject(AutenticazioneService);
  const router = inject(Router);

  if (authService.isAutenticato) {
    return true;
  }

  // Utente non autenticato -> reindirizzato alla pagina di login
  return router.createUrlTree(['/login']);
};
