import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

interface AppConfig {
  apiUrl: string;
  cdpUrl: string;
  adminRedirectUrl: string;
  oktaRedirectUri:string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  appConfig!: string;
  cdpConfig!: string;
  adminRedirectConfig!: string;
  oktaRedirectUri: any;
  hitCaptcha: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  loadAppConfig() {
    this.http
      .get<AppConfig>("/assets/path.json").subscribe({
        next: (data: AppConfig) => {
          this.appConfig = data.apiUrl
          this.cdpConfig = data.cdpUrl
          this.adminRedirectConfig = data.adminRedirectUrl
          this.oktaRedirectUri=data.oktaRedirectUri;
          this.hitCaptcha.next(true);
          // console.log("client config loadded", data);
          if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem("apiUrl", this.appConfig);
          sessionStorage.setItem("cdpUrl", this.cdpConfig);
          sessionStorage.setItem("adminRedirectUrl", this.adminRedirectConfig);
          }
        }
      }
      );
  }
}
