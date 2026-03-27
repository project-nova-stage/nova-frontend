/**
 * Identifica i ruoli di sistema per il controllo degli accessi (RBAC).
 * Deve corrispondere esattamente all'enum Ruolo del backend Java.
 */
export enum Ruolo {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
  TECNICO = 'TECNICO'
}
