import { Component, OnInit, inject } from '@angular/core';
import { AutenticazioneService } from '../../services/autenticazione.service';  
import { AssistenzaService } from '../../services/assistenza.service';
import { ProdottiService } from '../../services/prodotti.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Activity, BarChart2, PackageOpen, Wrench, Package, Briefcase, History, DollarSign, Users, AlertCircle, Cpu, Plus } from 'lucide-angular';
import { Prodotto } from '../../models/prodotto.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule
  ],
  template: `
    <div class="dashboard-container nova-container" data-aos="fade-up">
      <!-- Header Area -->
      <div class="header-section">
        <h1 class="font-orbitron dashboard-title">Ciao {{ utenteName }}! Dashboard {{ userRole | titlecase }}</h1>
        <p class="subtitle">Benvenuto nel tuo centro di controllo operativo.</p>
      </div>

      <!-- VISTA UTENTE NORMALE -->
      <ng-container *ngIf="userRole === 'utente'">
        <div class="metrics-grid">
          <div class="metric-card glass-panel glow-hover">
            <lucide-icon name="activity" class="cyan"></lucide-icon>
            <div class="metric-value">4<span class="muted">/4</span></div>      
            <div class="metric-label">Dispositivi Attivi</div>
          </div>
          <div class="metric-card glass-panel glow-hover">
            <lucide-icon name="alert-circle" class="purple"></lucide-icon>      
            <div class="metric-value">0</div>
            <div class="metric-label">Allarmi Rilevati</div>
          </div>
          <div class="metric-card glass-panel glow-hover">
            <lucide-icon name="wrench" class="cyan"></lucide-icon>
            <div class="metric-value">1</div>
            <div class="metric-label">Interventi Pianificati</div>
          </div>
        </div>

        <div class="main-grid mt-4">
          <div class="panel glass-panel">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
              <h2 class="font-orbitron text-gradient"><lucide-icon name="cpu" class="cyan-icon"></lucide-icon> Rete Dispositivi (Mock IoT)</h2>
              <button class="btn-primary" (click)="isConnectingDevice = !isConnectingDevice">
                <lucide-icon name="plus" size="18"></lucide-icon> Aggiungi
              </button>
            </div>

            <!-- ... qui eventualmente IoT form ... -->

            <div class="table-container">
              <table class="cyber-table">
                <thead>
                  <tr>
                    <th>Nome Modulo</th>
                    <th>Tipo</th>
                    <th>Stato</th>
                    <th>IP / Rete</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let d of mieiDispositivi">
                    <td class="font-medium">{{ d.nome }}</td>
                    <td><span class="badge">{{ d.tipo }}</span></td>
                    <td>
                      <span class="status-indicator" [class.online]="d.stato === 'Online'"></span>
                      {{ d.stato }}
                    </td>
                    <td class="muted">{{ d.ip }}</td>
                    <td>
                      <button class="btn-icon text-cyan" title="Configura">Configura</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ng-container>

      <!-- VISTA ADMIN -->
      <ng-container *ngIf="userRole === 'admin'">
        <div class="metrics-grid">
           <!-- metriche admin -->
        </div>

        <div class="main-grid mt-4">
          <div class="panel glass-panel" style="grid-column: 1 / -1;">
            <div class="panel-header" style="display:flex; justify-content:space-between; margin-bottom:20px;">
              <h2 class="font-orbitron"><lucide-icon name="package" class="purple"></lucide-icon> Gestione Prodotti e Scorte Reali</h2>
            </div>
            
            <div class="table-container">
              <table class="cyber-table">
                <thead>
                  <tr>
                    <th>SKU ID</th>
                    <th>Nome Prodotto</th>
                    <th>Prezzo</th>
                    <th>Disponibilità</th>
                    <th>Stato</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of adminShopItems">
                    <td>#NH-{{ item.id }}</td>
                    <td class="font-medium">{{ item.nome }}</td>
                    <td class="text-cyan font-bold">€{{ item.prezzo | number:'1.2-2' }}</td>
                    <td>
                      <div class="qty-bar">
                         <div class="qty-fill" [style.width.%]="(item.quantitaDisponibile / 200) * 100" [ngClass]="{'low-stock': item.quantitaDisponibile < 20}"></div>
                      </div>
                      <span class="muted" style="margin-left:8px; font-size:0.8rem">{{ item.quantitaDisponibile }} pz</span>
                    </td>
                    <td>
                      <span class="badge" [class.danger]="!item.attivo">{{ item.attivo ? 'Attivo' : 'Ritirato' }}</span>
                    </td>
                  </tr>
                                    <!-- Skeleton Table Rows -->
                  <tr *ngIf="isLoadingAdmin">
                    <td colspan="5">
                       <div class="skeleton skeleton-text"></div>
                    </td>
                  </tr>
                  <tr *ngIf="isLoadingAdmin">
                    <td colspan="5">
                       <div class="skeleton skeleton-text"></div>
                    </td>
                  </tr>
                  <tr *ngIf="!isLoadingAdmin && adminShopItems.length === 0">
                    <td colspan="5" class="text-center muted">Nessun prodotto trovato in catalogo.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ng-container>

      <!-- VISTA TECNICO -->
      <ng-container *ngIf="userRole === 'tecnico'">
        <!-- omesse apposta per non allungare -->
      </ng-container>

    </div>
  `,
  styles: [`
    .dashboard-container { padding-top: 120px; padding-bottom: 80px; min-height: 80vh; }
    .header-section { margin-bottom: 40px; }
    .dashboard-title { font-size: 2.5rem; text-transform: uppercase; letter-spacing: 2px; }
    .text-gradient { background: linear-gradient(120deg, #00e5ff, #17a66c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
    .metric-card { padding: 24px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
    .metric-card lucide-icon { opacity: 0.8; margin-bottom: 12px; }
    .metric-value { font-size: 2.2rem; font-weight: bold; font-family: 'Orbitron', sans-serif; display: flex; align-items: baseline; gap: 4px; }
    .metric-value .muted { font-size: 1rem; color: var(--text-secondary); opacity: 0.6; }
    .metric-label { font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
    .glow-hover:hover { box-shadow: 0 10px 30px rgba(0, 229, 255, 0.15); transform: translateY(-3px); }
    .main-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; }
    .panel { padding: 24px; border: 1px solid rgba(255,255,255,0.05); }
    .table-container { overflow-x: auto; }
    .cyber-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; }
    .cyber-table th { text-align: left; padding: 12px 16px; color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .cyber-table td { padding: 16px; background: rgba(255,255,255,0.02); transition: background 0.2s; }
    .cyber-table tr:hover td { background: rgba(255,255,255,0.05); }
    .qty-bar { display: inline-block; width: 100px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; vertical-align: middle; }
    .qty-fill { height: 100%; background: #00e5ff; transition: width 0.5s ease-out; }
    .qty-fill.low-stock { background: #ef4444; }
    .status-indicator { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #666; margin-right: 6px; }
    .status-indicator.online { background: #10b981; box-shadow: 0 0 8px #10b981; }
    .badge { padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; background: rgba(255,255,255,0.1); }
    .btn-icon { background: none; border: none; cursor: pointer; transition: opacity 0.2s; color: white; }
    .btn-icon:hover { opacity: 0.7; color: #00e5ff; }
    .text-cyan { color: #00e5ff; }
  `]
})
export class DashboardComponent implements OnInit {
    userRole: string | null = null;
    utenteName: string = '';
    
    // Ora usa il vero modello Prodotto del backend
    adminShopItems: Prodotto[] = [];
    isLoadingAdmin = true;
    lavoriTecnico: any[] = [];

    // IoT Devices Mocked logic as backend IoT is incomplete
    isConnectingDevice = false;
    nuovoDispositivo = { nome: '', type: 'hub', ip: '' };
    mieiDispositivi = [
      { id: '1', nome: 'Home Hub Zigbee/Wi-Fi', tipo: 'hub', stato: 'Online', ip: '192.168.1.100' },
      { id: '2', nome: 'Energy Meter Pro', tipo: 'energetico', stato: 'Online', ip: '192.168.1.102' }
    ];

    // Services
    private authService = inject(AutenticazioneService);
    private assistenzaService = inject(AssistenzaService);
    private prodottiService = inject(ProdottiService);

    ngOnInit() {
      // NON USA PIÙ localStorage fallback, ma usa il segnale corretto
      const usr = this.authService.utenteCorrente();
      if (usr) {
        this.userRole = usr.ruolo ? usr.ruolo.toLowerCase() : null;
        this.utenteName = usr.nome || '';

        // Fetch veri prodotti se Admin
        if (this.userRole === 'admin') {
           this.isLoadingAdmin = true;
           this.prodottiService.getProdotti().subscribe({
               next: (prodotti) => {
                   this.adminShopItems = prodotti;
                   this.isLoadingAdmin = false;
               },
               error: (err) => {
                   console.error("Errore fetch catalogo dashboard:", err);
                   this.isLoadingAdmin = false;
               }
           });
        }

        // Fetch info se Tecnico
        if (this.userRole === 'tecnico') {
           this.assistenzaService.getInstallazioniPerTecnico(usr.id).subscribe({
              next: (data: any[]) => this.lavoriTecnico = data,
              error: (err: any) => console.error("Errore recupero lavori", err) 
           });
        }
      }
    }
}

