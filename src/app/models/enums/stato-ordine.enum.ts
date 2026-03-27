/**
 * Stati del ciclo di vita di un ordine.
 */
export enum StatoOrdine {
  IN_ATTESA = 'IN_ATTESA',
  PAGATO = 'PAGATO',
  SPEDITO = 'SPEDITO',
  CONSEGNATO = 'CONSEGNATO',
  ANNULLATO = 'ANNULLATO'
}
