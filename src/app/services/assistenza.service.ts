import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface InstallazioneResponse {
  id: number;
  richiestaServizioId: number;
  tecnicoId: number;
  dataPianificata: string;
  stato: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssistenzaService {
  private api = inject(ApiService);

  /** Recupera le installazioni assegnate a un tecnico */
  getInstallazioniPerTecnico(tecnicoId: number): Observable<InstallazioneResponse[]> {
    return this.api.get<InstallazioneResponse[]>(`/assistenza/installazioni/tecnico/${tecnicoId}`);
  }

  /** Aggiorna lo stato di un'installazione / lavoro */
  cambiaStatoInstallazione(id: number, nuovoStato: string): Observable<InstallazioneResponse> {
    return this.api.patch<InstallazioneResponse>(`/assistenza/installazioni/${id}/stato?stato=${nuovoStato}`, {});
  }
}
