import { Ruolo } from './enums/ruolo.enum';
import { TipoCliente } from './enums/tipo-cliente.enum';

/**
 * Rappresenta l'anagrafica utente. 
 * Mappa fedelmente le informazioni restituite dal backend al login.
 */
export interface Utente {
  id: number;
  email: string;
  nome: string;
  cognome: string;
  ruolo: Ruolo;
  tipoCliente?: TipoCliente; // Opzionale solo per ADMIN e TECNICI
  createdAt: string; // ISO string gestita da Instant in Java
}
