import { StatoOrdine } from './enums/stato-ordine.enum';
import { Prodotto } from './prodotto.model';
import { Utente } from './utente.model';

/**
 * Riga ordine con prezzo storicizzato (prezzoAcquisto).
 */
export interface OrdineProdotto {
  id: number;
  prodotto: Prodotto;
  quantita: number;
  prezzoAcquisto: number; // Snapshot del prezzo al checkout
}

/**
 * Storico transazione economica completata.
 */
export interface Ordine {
  id: number;
  utente: Utente;
  numeroOrdine: string;
  stato: StatoOrdine;
  importoTotale: number;
  dataOrdine: string;
  prodotti: OrdineProdotto[];
}
