import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, User, Lock, Mail, ChevronRight, UserPlus, Fingerprint, Loader2 } from 'lucide-angular';
import { AutenticazioneService, LoginRequest, RegistrazioneRequest, AuthResponse } from '../../services/autenticazione.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, RouterModule],
  template: `
    <div class="login-container parallax-bg" data-aos="fade-up">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      
      <div class="login-card glass-panel slide-up" [class.register-mode]="isRegisterMode">
        
        <div class="login-header">
          <div class="logo-icon glow-on-hover">
             <lucide-icon [name]="isRegisterMode ? 'user-plus' : 'fingerprint'" [size]="32" class="cyan-icon"></lucide-icon>
          </div>
          <h2 class="font-orbitron text-gradient">{{ isRegisterMode ? 'Crea Account' : 'Accesso Portale' }}</h2>
          <p class="subtitle">{{ isRegisterMode ? 'Unisciti al network Domotic Labs.' : 'Inserisci le tue credenziali per entrare.' }}</p>
        </div>

        <div class="auth-tabs">
          <button class="tab-btn" [class.active]="!isRegisterMode" (click)="setMode(false)">Login</button>
          <button class="tab-btn" [class.active]="isRegisterMode" (click)="setMode(true)">Registrati</button>
        </div>

        <div *ngIf="errorMessage" class="error-banner">
          {{ errorMessage }}
        </div>

        <!-- FORM LOGIN -->
        <form *ngIf="!isRegisterMode" class="login-form mt-4" (ngSubmit)="doLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label>Email Diretta</label>
            <div class="input-wrapper">
              <lucide-icon name="mail" [size]="18" class="input-icon"></lucide-icon>
              <input type="email" name="email" [(ngModel)]="loginData.email" placeholder="esempio@domoticlaboratories.com" required>
            </div>
          </div>

          <div class="form-group">
            <label>Password</label>
            <div class="input-wrapper">
              <lucide-icon name="lock" [size]="18" class="input-icon"></lucide-icon>
              <input type="password" name="password" [(ngModel)]="loginData.password" placeholder="********" required>
            </div>
          </div>

          <button type="submit" class="btn-main glow-on-hover mt-4" [disabled]="loading || loginForm.invalid" [class.disabled-btn]="loginForm.invalid">
             <span *ngIf="!loading">Accedi <lucide-icon name="chevron-right" [size]="18" style="vertical-align: middle;"></lucide-icon></span>
             <span *ngIf="loading" style="display:flex; align-items:center; gap:8px;"><lucide-icon name="loader-2" class="spinner-icon"></lucide-icon> Autenticazione...</span>
          </button>
        </form>

        <!-- FORM REGISTRAZIONE -->
        <form *ngIf="isRegisterMode" class="login-form mt-4 slide-in" (ngSubmit)="doRegister()" #registerForm="ngForm">
          <div class="form-group">
            <label>Scegli il tuo Ruolo</label>
            <div class="input-wrapper">
              <lucide-icon name="user" [size]="18" class="input-icon"></lucide-icon>
              <select name="codiceRuolo" [(ngModel)]="registerData.codiceRuolo" class="admin-input-select" required>
                 <option value="CLIENTE">Utente/Cliente</option>
                 <option value="TECNICO">Tecnico/Installatore</option>
                 <option value="ADMIN">Amministratore</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Nome Reale</label>
            <div class="input-wrapper">
              <lucide-icon name="user" [size]="18" class="input-icon"></lucide-icon>
              <input type="text" name="nome" [(ngModel)]="registerData.nome" placeholder="Mario" required>
            </div>
          </div>

          <div class="form-group">
            <label>Cognome Reale</label>
            <div class="input-wrapper">
              <lucide-icon name="user" [size]="18" class="input-icon"></lucide-icon>
              <input type="text" name="cognome" [(ngModel)]="registerData.cognome" placeholder="Rossi" required>
            </div>
          </div>

          <div class="form-group">
            <label>Email</label>
            <div class="input-wrapper">
              <lucide-icon name="mail" [size]="18" class="input-icon"></lucide-icon>
              <input type="email" name="regEmail" [(ngModel)]="registerData.email" placeholder="mario.rossi@email.com" required>
            </div>
          </div>

          <div class="form-group">
            <label>Password Protetta</label>
            <div class="input-wrapper">
              <lucide-icon name="lock" [size]="18" class="input-icon"></lucide-icon>
              <input type="password" name="regPassword" [(ngModel)]="registerData.password" placeholder="Minimo 6 caratteri" required>
            </div>
          </div>

          <button type="submit" class="btn-main glow-on-hover mt-4" [disabled]="loading || registerForm.invalid" [class.disabled-btn]="registerForm.invalid">
            <span *ngIf="!loading">Registrati Subito</span>
            <span *ngIf="loading" style="display:flex; align-items:center; gap:8px;"><lucide-icon name="loader-2" class="spinner-icon"></lucide-icon> Elaborazione...</span>
          </button>
        </form>
        
        <div class="text-center mt-4 border-t-divider pt-3">
          <a routerLink="/" class="back-link block-mt">Torna alla Home</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      width: 100%; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
      background: radial-gradient(circle at center, rgba(5, 18, 11, 1) 0%, rgba(2, 8, 4, 1) 100%);
    }

    .floating-shapes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden; pointer-events: none;}
    .shape { position: absolute; filter: blur(60px); border-radius: 50%; opacity: 0.4; animation: float 10s infinite ease-in-out alternate; }
    .shape-1 { width: 300px; height: 300px; background: rgba(0, 229, 255, 0.2); top: 10%; left: 15%; animation-delay: 0s; }
    .shape-2 { width: 400px; height: 400px; background: rgba(23, 166, 108, 0.18); bottom: 10%; right: 10%; animation-delay: -3s; }
    .shape-3 { width: 250px; height: 250px; background: rgba(234, 179, 8, 0.1); top: 40%; left: 60%; animation-delay: -6s; }

    @keyframes float {
      0% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-30px) scale(1.1); }
      100% { transform: translateY(0) scale(1); }
    }

    .login-card {
      width: 100%; max-width: 480px; padding: 40px; margin: 0 20px;
      z-index: 10; background: rgba(5, 18, 11, 0.85); /* Leggermente pÃ¬Ã¹ scuro per risalto form */
      border: 1px solid rgba(255,255,255,0.05); border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      transition: all 0.4s ease;
    }
    .register-mode {
      max-width: 520px; /* Un po' piu largo per la reg */
    }

    .login-header { text-align: center; margin-bottom: 24px; }
    .logo-icon {
      width: 64px; height: 64px; margin: 0 auto 20px auto;
      background: linear-gradient(135deg, rgba(39,224,143,0.24) 0%, rgba(23,166,108,0.24) 100%);
      border-radius: 16px; display: flex; align-items: center; justify-content: center;
      border: 1px solid rgba(0,229,255,0.3);
    }
    .cyan-icon { color: var(--accent-cyan); }
    .subtitle { color: var(--text-secondary); font-size: 0.95rem; margin-top: 10px; line-height: 1.5; }

    .error-banner {
      background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5; padding: 12px; border-radius: 8px; margin-bottom: 20px;
      font-size: 0.9rem; text-align: center;
    }

    .auth-tabs { display: flex; background: rgba(0,0,0,0.4); border-radius: 12px; padding: 6px; margin-bottom: 24px; }
    .tab-btn { flex: 1; padding: 10px; border: none; background: transparent; color: var(--text-secondary); font-weight: 600; border-radius: 8px; cursor: pointer; transition: 0.3s; }
    .tab-btn:hover { color: white; }
    .tab-btn.active { background: rgba(39,224,143,0.15); color: var(--accent-cyan); box-shadow: 0 0 10px rgba(39,224,143,0.1); }

    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px; font-weight: 500; }
    
    .input-wrapper { position: relative; }
    .input-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-secondary); }
    input {
      width: 100%; padding: 14px 16px 14px 44px; border-radius: 10px;
      background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.1);
      color: var(--text-primary); font-family: 'Inter', sans-serif; transition: all 0.2s;
    }
    input:focus { outline: none; border-color: rgba(39,224,143,0.65); box-shadow: 0 0 0 2px rgba(39,224,143,0.16); }
    
    select.admin-input-select {
      width: 100%; padding: 14px 16px 14px 44px; border-radius: 10px;
      background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.1);
      color: var(--text-primary); font-family: 'Inter', sans-serif; transition: all 0.2s;
      appearance: none; cursor: pointer;
    }
    select.admin-input-select option { background: #07110d; padding: 10px; }
    select.admin-input-select:focus { outline: none; border-color: rgba(39,224,143,0.65); box-shadow: 0 0 0 2px rgba(39,224,143,0.16); }

    .btn-main { 
        width: 100%; padding: 16px; border: none; font-size: 1.05rem; 
        font-weight: 700; /* Incrementato contrast */
        border-radius: 12px; cursor: pointer; 
        background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%); 
        color: #000 !important; /* Forza contrasto scuro sul verde brillante! */
        transition: all 0.2s; 
    }
    .btn-main:disabled { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.3) !important; cursor: not-allowed; box-shadow: none; pointer-events: none; }
    .btn-main:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(39,224,143,0.5); }

    .border-t-divider { border-top: 1px solid rgba(255,255,255,0.08); }
    .cyan-link { color: var(--accent-cyan); text-decoration: none; font-weight: 600; transition: color 0.2s;}
    .cyan-link:hover { color: #84e8ee; text-decoration: underline; }
    .toggle-text { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 12px; }

    .back-link { color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
    .back-link:hover { color: var(--text-primary); }
    .block-mt { display: inline-block; margin-top: 8px; }

    .slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
    .slide-in { animation: slideInX 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideInX { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  `]
})
export class LoginComponent {
  
  isRegisterMode = false;
  loading = false;
  errorMessage = '';

  loginData: LoginRequest = { email: '', password: '' };
  registerData: RegistrazioneRequest = { nome: '', cognome: '', email: '', password: '', codiceRuolo: 'CLIENTE' };

  private router = inject(Router);
  private authService = inject(AutenticazioneService);

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
  }

  setMode(isRegister: boolean) {
    this.isRegisterMode = isRegister;
    this.errorMessage = '';
  }

  doLogin() {
    if (!this.loginData.email || !this.loginData.password) return;
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
         this.loading = false;
         this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
         this.loading = false;
         this.errorMessage = 'Credenziali non valide o errore di connessione.';
         console.error('Errore Login', err);
      }
    });
  }

  doRegister() {
    if(!this.registerData.email || !this.registerData.password || !this.registerData.nome || !this.registerData.cognome) return;
    
    this.loading = true;
    this.errorMessage = '';

    this.authService.registra(this.registerData).subscribe({
      next: (res: any) => {
         this.loading = false;
         // Il registra solitamente effettua gia la creazione, alcuni framework ritornano auth response.
         // Se entra qua: Successo!
         this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
         this.loading = false;
         this.errorMessage = 'Errore in fase di registrazione. Controlla i dati o se l\'email Ã¨ giÃ  in uso.';
      }
    });
  }
}

