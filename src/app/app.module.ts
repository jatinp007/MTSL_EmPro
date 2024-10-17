import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { PrimeNGModule } from './primeng/primeng.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { employeeFormReducer } from './shared/store/employee-form.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { VerifyCodeComponent } from './features/auth/verify-code/verify-code.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthenticationService } from './core/services/authentication.service';
import { ConfigService } from './core/services/config.service';
import { ApiInterceptor } from './core/interceptor/api.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerifyCodeComponent
  ],
  imports: [
    BrowserModule,
    PrimeNGModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ employees: employeeFormReducer }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideClientHydration(), 
    // AuthenticationService,
    // {
    //     provide: APP_INITIALIZER,
    //     multi: true,
    //     deps: [ConfigService],
    //     useFactory: (appConfigService: ConfigService) => {
    //         return () => {
    //             return appConfigService.loadAppConfig();
    //         };
    //     },
    // },
    provideHttpClient(),
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
