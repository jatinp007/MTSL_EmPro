import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { employeeFormReducer } from './shared/store/employee-form.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { VerifyCodeComponent } from './features/auth/verify-code/verify-code.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ApiInterceptor } from './core/interceptor/api.interceptor'
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerifyCodeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,   
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
