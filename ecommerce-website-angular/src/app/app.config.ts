import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthGuard } from './_auth/auth.guard';
import { authInterceptor } from './_auth/auth.interceptor';
import { EcommerceUserService } from './_services/ecommerce-user-service';

import { routes } from './app.routes';
import { EcommerceProductService } from './_services/ecommerce-product-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
