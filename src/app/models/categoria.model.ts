/**
 * Struttura gerarchica del catalogo Dynamic Laboratories.
 * Gestisce l'auto-referenzialità per permettere N livelli di sottocategorie.
 */
export interface Categoria {
  id: number;
  nome: string;
  slug: string;
  categoriaPadre?: Categoria; // Relazione auto-referenziale
  sottocategorie?: Categoria[]; // Figli dell'albero
}
