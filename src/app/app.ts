import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import AOS from 'aos';

/**
 * Componente root principale dell'applicazione Angular ("Dynamic Laboratories").
 * Funge da contenitore principale per il layout base dell'interfaccia.
 *
 * Include:
 * - \NavbarComponent\ (barra di navigazione superiore)
 * - \RouterOutlet\ (area dove i componenti delle varie rotte vengono renderizzati)
 * - \FooterComponent\ (piè di pagina globale)
 * - \ToastComponent\ (notifiche)
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: false,
      offset: 70,
      mirror: true
    });

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => AOS.refreshHard(), 50);
      });
  }
}
