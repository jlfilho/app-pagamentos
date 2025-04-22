import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter, MAT_NATIVE_DATE_FORMATS, MAT_DATE_FORMATS } from '@angular/material/core';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(),
  provideAnimations(),
  provideNativeDateAdapter(),
  { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  { provide: LOCALE_ID, useValue: 'pt-BR' },
  provideNgxMask(),
  ]
};

