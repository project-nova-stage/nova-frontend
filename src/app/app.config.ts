import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideLucideIcons, Home, Package, Bot, Wrench, LayoutDashboard, Info, Headset, ShoppingCart, User, LogIn, LogOut, Menu, X, Lock, Mail, ChevronRight, UserPlus, Fingerprint, Loader2, Trash2, CreditCard, Activity, BarChart2, PackageOpen, Briefcase, History, DollarSign, Users, AlertCircle, Cpu, Plus, CheckCircle2, AlertTriangle, Eye, EyeOff } from 'lucide-angular';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideLucideIcons({ Home, Package, Bot, Wrench, LayoutDashboard, Info, Headset, ShoppingCart, User, LogIn, LogOut, Menu, X, Lock, Mail, ChevronRight, UserPlus, Fingerprint, Loader2, Trash2, CreditCard, Activity, BarChart2, PackageOpen, Briefcase, History, DollarSign, Users, AlertCircle, Cpu, Plus, CheckCircle2, AlertTriangle, Eye, EyeOff })
  ]
};
