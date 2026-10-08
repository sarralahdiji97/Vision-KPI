import { inject, LOCALE_ID, NgModule, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginComponent } from './login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material-module/material.module';
import { BaseHttpService } from './shared/services/base-http-service/base-http.service';
import { HTTP_INTERCEPTORS, provideHttpClient, HttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';
import { ErrorModalDialogComponent } from './shared/components/dialogs/error-dialog/error-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMAT } from './shared/enums/general.enum';
import { MomentDateAdapter } from '@angular/material-moment-adapter';


export function initializeApp(baseHttpService: BaseHttpService) {
  return () => baseHttpService.load();
}
@NgModule({
  declarations: [
    App,
    LoginComponent,
    ErrorModalDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslatePipe,
    NgxSpinnerModule
  ],
  providers: [BaseHttpService,
      provideAppInitializer(() => {
      const baseHttpService = inject(BaseHttpService);
      return baseHttpService.load();
    }),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
     { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
