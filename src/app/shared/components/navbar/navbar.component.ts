import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LucideAngularModule, Home, Package, Bot, Wrench, LayoutDashboard, Info, Headset, ShoppingCart, User, LogIn, LogOut, Menu, X } from 'lucide-angular';
import { filter, Subscription } from 'rxjs';
import { AutenticazioneService } from '../../../services/autenticazione.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <nav class="navbar glass-panel-nav">
      <div class="nav-container">
        <!-- Logo -->
        <a routerLink="/" class="logo">
          <div class="logo-icon">
            <lucide-icon name="bot" [size]="24" class="cyan-icon"></lucide-icon>
          </div>
          <div class="logo-text">
            <span class="brand font-orbitron">Domotic Labs</span>
            <span class="sub-brand">Living Systems</span>
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="menu-desktop">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            <lucide-icon name="home" [size]="18"></lucide-icon> Home
          </a>
          <a routerLink="/prodotti" routerLinkActive="active" class="nav-item">
            <lucide-icon name="package" [size]="18"></lucide-icon> Prodotti
          </a>
          <a routerLink="/ai-assistant" routerLinkActive="active" class="nav-item">
            <lucide-icon name="bot" [size]="18"></lucide-icon> Assistente Preventivi (Soon)
          </a>
          <a routerLink="/servizi" routerLinkActive="active" class="nav-item">
            <lucide-icon name="wrench" [size]="18"></lucide-icon> Servizi
          </a>
          <!-- Dashboard visible only if logged in -->
          <a *ngIf="isLoggedIn" routerLink="/dashboard" routerLinkActive="active-purple" class="nav-item dashboard-link">
            <lucide-icon name="layout-dashboard" [size]="18"></lucide-icon> Dashboard
          </a>
          <a routerLink="/about" routerLinkActive="active" class="nav-item">
            <lucide-icon name="info" [size]="18"></lucide-icon> About
          </a>
          <a routerLink="/supporto" routerLinkActive="active" class="nav-item">
            <lucide-icon name="headset" [size]="18"></lucide-icon> Supporto
          </a>
        </div>

        <!-- Auth & Actions (Desktop) -->
        <div class="actions desktop-actions">
          
          <!-- Mostra il carrello SOLO se siamo nella rotta dei prodotti -->
          <button *ngIf="isShopRoute" routerLink="/carrello" class="action-btn cart-btn glow-on-hover">
            <lucide-icon name="shopping-cart" [size]="20"></lucide-icon>
            <span class="cart-badge">3</span>
          </button>
          
          <!-- Auth Buttons -->
          <ng-container *ngIf="!isLoggedIn; else userMenu">
            <button routerLink="/login" class="action-btn login-btn">
              <lucide-icon name="log-in" [size]="18"></lucide-icon> Login
            </button>
          </ng-container>

          <ng-template #userMenu>
            <div class="user-menu">
              <button class="action-btn user-btn glow-on-hover">
                <lucide-icon name="user" [size]="18"></lucide-icon> {{ userRole | uppercase }}
              </button>
              <button (click)="logout()" class="action-btn logout-btn" title="Esci">
                <lucide-icon name="log-out" [size]="18"></lucide-icon> Logout
              </button>
            </div>
          </ng-template>
        </div>

        <!-- Mobile Toggle -->
        <button class="mobile-toggle" (click)="toggleMobileMenu()" [attr.aria-label]="isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'">
          <lucide-icon [name]="isMobileMenuOpen ? 'x' : 'menu'" [size]="20"></lucide-icon>
        </button>
      </div>

      <div class="mobile-menu" [class.open]="isMobileMenuOpen">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="mobile-item">
          <lucide-icon name="home" [size]="18"></lucide-icon> Home
        </a>
        <a routerLink="/prodotti" routerLinkActive="active" class="mobile-item">
          <lucide-icon name="package" [size]="18"></lucide-icon> Prodotti
        </a>
        <a routerLink="/ai-assistant" routerLinkActive="active" class="mobile-item">
          <lucide-icon name="bot" [size]="18"></lucide-icon> Assistente Preventivi (Soon)
        </a>
        <a routerLink="/servizi" routerLinkActive="active" class="mobile-item">
          <lucide-icon name="wrench" [size]="18"></lucide-icon> Servizi
        </a>
        <a *ngIf="isLoggedIn" routerLink="/dashboard" routerLinkActive="active-purple" class="mobile-item">
          <lucide-icon name="layout-dashboard" [size]="18"></lucide-icon> Dashboard
        </a>
        <a routerLink="/about" routerLinkActive="active" class="mobile-item">
          <lucide-icon name="info" [size]="18"></lucide-icon> About
        </a>
        <a routerLink="/supporto" routerLinkActive="active" class="mobile-item">
          <lucide-icon name="headset" [size]="18"></lucide-icon> Supporto
        </a>

        <div class="mobile-utility-row">
          <button *ngIf="isShopRoute" routerLink="/carrello" class="action-btn cart-btn glow-on-hover">
            <lucide-icon name="shopping-cart" [size]="20"></lucide-icon>
            <span class="cart-badge">3</span>
          </button>

          <ng-container *ngIf="!isLoggedIn; else mobileUserMenu">
            <button routerLink="/login" class="action-btn login-btn mobile-login-btn">
              <lucide-icon name="log-in" [size]="18"></lucide-icon> Login
            </button>
          </ng-container>

          <ng-template #mobileUserMenu>
            <button class="action-btn user-btn">
              <lucide-icon name="user" [size]="18"></lucide-icon> {{ userRole | uppercase }}
            </button>
            <button (click)="logout()" class="action-btn logout-btn" title="Esci">
              <lucide-icon name="log-out" [size]="18"></lucide-icon> Logout
            </button>
          </ng-template>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed; top: 0; left: 0; width: 100%; height: 70px;
      z-index: 1000; border-radius: 0;
      display: flex; align-items: center; justify-content: space-between;
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      background: rgba(2, 6, 12, 0.92); border-bottom: 1px solid rgba(50, 86, 110, 0.42);
      transition: all 0.3s ease;
    }
    .nav-container {
      width: 100%; max-width: 1800px; padding: 0 var(--spacing-lg); margin: 0 auto;
      display: flex; justify-content: space-between; align-items: center;
    }

    /* Logo Area */
    .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .logo-icon { width: 40px; height: 40px; background: linear-gradient(135deg, rgba(39,224,143,0.28) 0%, rgba(23,166,108,0.24) 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(39,224,143,0.24); }
    .cyan-icon { color: var(--accent-cyan); }
    .logo-text { display: flex; flex-direction: column; line-height: 1.1; }
    .brand { font-size: 1.2rem; font-weight: 700; color: #9ceeff; text-shadow: 0 0 10px rgba(107,219,255,0.38); }
    .sub-brand { font-size: 0.75rem; color: var(--text-secondary); font-family: 'Inter', sans-serif; }

    /* Desktop Menu */
    .menu-desktop { display: none; gap: 8px; align-items: center; }
    @media (min-width: 1024px) { .menu-desktop { display: flex; } }

    .nav-item {
      display: flex; align-items: center; gap: 8px; color: var(--text-secondary); text-decoration: none;
      font-weight: 500; font-size: 0.9rem; padding: 8px 16px; border-radius: 8px; transition: all var(--transition-fast);
    }
    .nav-item:hover { color: var(--text-primary); background: rgba(255,255,255,0.05); }
    .nav-item.active { background: rgba(31, 109, 122, 0.28); color: #84e8ee; }
    .nav-item.active-purple { background: rgba(23, 166, 108, 0.34); color: #dcffef; box-shadow: none; }

    /* Actions */
    .actions { display: flex; gap: 12px; align-items: center; }
    .desktop-actions { display: none; }
    @media (min-width: 1024px) { .desktop-actions { display: flex; } }
    .user-menu { display: flex; gap: 8px; align-items: center; }

    .mobile-toggle {
      width: 42px; height: 42px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12);
      display: inline-flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.04); color: var(--text-primary); cursor: pointer;
      transition: all 0.2s ease;
    }
    .mobile-toggle:hover { border-color: rgba(0, 229, 255, 0.4); color: var(--accent-cyan); }
    @media (min-width: 1024px) { .mobile-toggle { display: none; } }

    .mobile-menu {
      position: absolute; top: 70px; left: 0; right: 0;
      background: rgba(8, 14, 26, 0.98); backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 12px; display: none;
      box-shadow: 0 24px 40px rgba(0,0,0,0.35);
    }
    .mobile-menu.open { display: block; }
    @media (min-width: 1024px) { .mobile-menu { display: none !important; } }

    .mobile-item {
      display: flex; align-items: center; gap: 10px;
      color: var(--text-secondary); text-decoration: none;
      padding: 12px 14px; border-radius: 10px; margin-bottom: 6px;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }
    .mobile-item:hover { color: var(--text-primary); background: rgba(255,255,255,0.06); }
    .mobile-item.active { color: var(--accent-cyan); background: rgba(0,229,255,0.12); border-color: rgba(0,229,255,0.25); }
    .mobile-item.active-purple { color: #fff; background: rgba(23, 166, 108, 0.8); border-color: rgba(39, 224, 143, 1); }

    .mobile-utility-row {
      margin-top: 8px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08);
      display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
    }
    .mobile-login-btn { flex: 1; min-width: 140px; }
    
    .action-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      height: 40px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; font-family: 'Inter', sans-serif;
      cursor: pointer; transition: all 0.2s ease; border: 1px solid transparent;
    }
    
    .cart-btn {
      position: relative; width: 44px; height: 44px; border-radius: 50%;
      background: rgba(255,255,255,0.05); color: var(--text-secondary);
      border-color: rgba(255,255,255,0.1);
    }
    .cart-btn:hover { color: var(--accent-cyan); border-color: rgba(39,224,143,0.46); background: rgba(39,224,143,0.1); }
    .cart-badge {
      position: absolute; top: -2px; right: -2px; background: #1bb575; color: white;
      font-size: 0.7rem; font-weight: bold; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center;
      border-radius: 50%; box-shadow: 0 0 8px rgba(39, 224, 143, 0.5);
    }

    .login-btn {
      padding: 0 20px; background: rgba(109, 227, 255, 0.14); color: var(--accent-cyan);
      border-color: rgba(109, 227, 255, 0.34);
    }
    .login-btn:hover { background: var(--accent-cyan); color: var(--primary-dark); box-shadow: 0 0 15px rgba(39,224,143,0.4); }

    .user-btn {
      padding: 0 16px; background: rgba(23, 166, 108, 0.2); color: #ddfff1;
      border-color: rgba(39, 224, 143, 0.35);
    }
    .user-btn:hover { background: rgba(23, 166, 108, 0.3); border-color: var(--accent-purple); }

    .logout-btn {
      padding: 0 16px; background: rgba(239, 68, 68, 0.1); color: #fca5a5; border-color: rgba(239, 68, 68, 0.25);
    }
    .logout-btn:hover { color: #fff; background: rgba(239, 68, 68, 0.8); border-color: #EF4444; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5); }

    @media (max-width: 767px) {
      .nav-container { padding: 0 12px; }
      .logo { gap: 8px; }
      .logo-icon { width: 34px; height: 34px; border-radius: 8px; }
      .brand { font-size: 1rem; }
      .sub-brand { display: none; }
      .mobile-menu { max-height: calc(100vh - 70px); overflow-y: auto; }
      .mobile-item { padding: 11px 12px; margin-bottom: 4px; }
      .mobile-utility-row { flex-direction: column; align-items: stretch; }
      .mobile-login-btn, .user-btn, .logout-btn, .cart-btn { width: 100%; min-width: 0; }
      .cart-btn { border-radius: 10px; height: 40px; }
      .cart-badge { right: 10px; top: 10px; }
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isShopRoute = false;
  isLoggedIn = false;
  userRole = '';
  utenteName: string | null = null;
  isMobileMenuOpen = false;
  private routerSubscription!: Subscription;

  private authService = inject(AutenticazioneService);
  private cdr = inject(ChangeDetectorRef);

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateRouteState(this.router.url);
    this.checkLoginStatus();

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateRouteState(event.urlAfterRedirects || event.url);
      this.checkLoginStatus();
      this.isMobileMenuOpen = false;
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  private updateRouteState(url: string) {
    const cleanUrl = (url || '').split('?')[0].split('#')[0];
    this.isShopRoute = cleanUrl.startsWith('/prodotti');
  }

  checkLoginStatus() {
    // Controlla se siamo in mockup session (bypassiamo per sviluppo visuale se necessario)
    const mockRole = localStorage.getItem('mockUserRole');
    
    if (this.authService.isAutenticato) {
       this.isLoggedIn = true;
       const usr = this.authService.utenteCorrente();
       if (usr) {
          this.userRole = usr.ruolo ? usr.ruolo.toLowerCase() : '';
          this.utenteName = usr.nome;
       }
    } else if (mockRole) {
       this.isLoggedIn = true;
       this.userRole = mockRole;
       this.utenteName = mockRole === 'admin' ? 'SuperAdmin' : (mockRole === 'tecnico' ? 'Tecnico' : 'Ospite');
    } else {
       this.isLoggedIn = false;
       this.userRole = '';
       this.utenteName = null;
    }
    
    // Forza il ricalcolo della view se chiamato fuori dal ciclo di change detection standard
    this.cdr.detectChanges();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = '';
    this.utenteName = null;
    // Pulisce anche il mock se presente
    localStorage.removeItem('mockUserRole');
    this.router.navigate(['/']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
