import { Categoria } from './categoria.model';

/**
 * Galleria immagini associata a un prodotto.
 */
export interface ImmagineProdotto {
  id: number;
  urlImmagine: string;
  principale: boolean;
}

/**
 * Metadati tecnici del prodotto.
 */
export interface SpecificaProdotto {
  id: number;
  etichetta: string;
  valore: string;
}

/**
 * Entità centrale del catalogo. 
 * Include le relazioni con Categoria, Immagini e Specifiche.
 */
export interface Prodotto {
  id: number;
  sku: string;
  nome: string;
  descrizione?: string;
  prezzo: number;
  quantitaDisponibile: number;
  attivo: boolean;
  categoria: Categoria;
  immagini: ImmagineProdotto[];
  specifiche: SpecificaProdotto[];
  createdAt: string;
  updatedAt: string;
}
