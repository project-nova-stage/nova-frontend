import { Prodotto } from './prodotto.model';
import { Utente } from './utente.model';

/**
 * Singola riga del carrello con quantità selezionata.
 */
export interface CarrelloProdotto {
  id?: number;
  prodotto: Prodotto;
  quantita: number;
  createdAt?: string;
}

/**
 * Stato della sessione di acquisto dell'utente.
 */
export interface Carrello {
  id: number;
  utente: Utente;
  prodotti: CarrelloProdotto[];
  updatedAt: string;
}
