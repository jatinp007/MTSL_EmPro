import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';
import { ConfigService } from './config.service';
import { ToastService } from './toast.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { PATH, SESSION_STORAGE, TOAST_TYPE } from '../../shared/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiBaseUrl: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private configService: ConfigService,
    // private oauthService: OAuthService,
    private activatedRoute: ActivatedRoute,
    private httpservice: HttpService,
    private toast: ToastService
  ) {
    this.apiBaseUrl = this.configService.appConfig;
    this.getParam();
  }

  /**
  * @function to verify domain user
  * @param email
  * @returns observable
  */
  verifyUser(email: string): Observable<any> {
    let payload = {
      username: email
    }
    this.apiBaseUrl = this.configService.appConfig;
    return this.http.post<any>(`${this.apiBaseUrl}/validateUserId`, payload)
      .pipe(map((data) => {
        if (data.message == "Domain user.") {
        //   this.loginImplicit();
        } else if (data.message == "Non domain user.") {
          if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem(SESSION_STORAGE.USER_EMAIL, JSON.stringify(data.response.email));
          return data
          }
        } else {
          return data;
        }
      }));
  }

  /**
   * @function to send user details to server
   * @param username
   * @param password
   * @returns user details and access token
   */
  login(username: string, password: string, userId:string) {

    let payload = {
      username: username,
      password: password,
      userId:userId
    };

    return this.http.post<any>(`${this.apiBaseUrl}/login`, payload)
  .pipe(
    map((data: any) => {
      // if (data.validateUserPwd.body.status == '0007') {
      //   this.toast.show(CONSTANTS.WRONG_USERNAME_PASSWORD, TOAST_TYPE.ERROR);
      //   return;
      // }
      if (data.validateUserPwd.body.message == '737') {
        this.toast.show("Password expired. Please reset your password.", TOAST_TYPE.ERROR);
        return;
      }

      if (data.validateUserPwd.body.status == '0008') {
        this.toast.show(data.validateUserPwd.body.message, TOAST_TYPE.ERROR);
        return;
      }

      if (data.validateUserPwd.body.status === '0006') {

        // Proceed only if status is '0006'
        if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem(SESSION_STORAGE.USER_DATA, JSON.stringify(data.validateUserPwd.body.userDetails));
        sessionStorage.setItem('userId', JSON.stringify(data.validateUserPwd.body.userDetails?.userId));
        sessionStorage.setItem(SESSION_STORAGE.TOKEN, JSON.stringify(data.validateUserPwd.body?.userDetails?.token));
        sessionStorage.setItem(SESSION_STORAGE.PREFERREDLANG, JSON.stringify(data.policyDetails.preferredLang));
        sessionStorage.setItem("baseLangId", JSON.stringify(data.validateUserPwd.body?.userDetails?.baseLangId));

        localStorage.setItem(SESSION_STORAGE.USER_DATA, JSON.stringify(data.validateUserPwd.body.userDetails));
        localStorage.setItem('userId', JSON.stringify(data.validateUserPwd.body.userDetails?.userId));
        localStorage.setItem(SESSION_STORAGE.TOKEN, JSON.stringify(data.validateUserPwd.body?.userDetails?.token));
        localStorage.setItem(SESSION_STORAGE.PREFERREDLANG, JSON.stringify(data.policyDetails.preferredLang));
        localStorage.setItem("baseLangId", JSON.stringify(data.validateUserPwd.body.userDetails?.baseLangId));

        return data; // Proceed with the data
        }
      }

      else {
        // Handle the case where status is not '0006'
        // return throwError(() => new Error('Invalid status code: ' + data.validateUserPwd.body.status));
        return data;
      }
    }),
    catchError(error => {
      // Handle any errors that occur in the map operator
      console.error('Error occurred:', error);
      // Optionally, you can return a different observable or an empty observable
      return of(null); // or you can return throwError(error) if you want to propagate the error
    })
  );

  }

  /**
   * @function check if access token is stored in browser
   *  @returns access token
   */
  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
    let userToken = localStorage.getItem(SESSION_STORAGE.TOKEN)!;

    if (userToken == null) { // This checks if userToken is null or undefined
      const tokenString = localStorage.getItem(SESSION_STORAGE.TOKEN);
      if (tokenString) {
        userToken = JSON.parse(tokenString);
      }
    }
    if (!userToken) {
      return false;
    } else {
      return this.http.post(this.apiBaseUrl + `/validateToken`, userToken);
    }
  }
  return false; 
}

  /**
  * @function encrypting password into binary
  * @param oldPassword
  * @returns encrypted password
  */
  encryptPassword(oldPassword: string): string {
    var newPassword: string = "";
    var length = oldPassword.length;
    var newPassword: string = "";
    var temp: number[] = new Array(length);
    var i: number = 0;
    var ran: number = (Math.floor(Math.random() * 256) + 1);
    var ch;

    for (i = 0; i < length; i++) {
      ch = oldPassword.charCodeAt(i) //charAt(i);
      temp[i] = parseInt("" + ch);

      if ((temp[i] >= 0) && (temp[i] < 64))
        temp[i] += 128;
      else if ((temp[i] >= 64) && (temp[i] < 128))
        temp[i] += 128;
      else if ((temp[i] >= 128) && (temp[i] < 192))
        temp[i] -= 128;
      else if ((temp[i] >= 192) && (temp[i] < 256))
        temp[i] -= 128;
      temp[i] += ran;
      newPassword += this.convertToBoolean(temp[i]);
    }
    newPassword += this.convertToBoolean(ran);
    return newPassword;
  }

  //Function to convert number in binary format.
  convertToBoolean(intcode: number) {
    var num: number = intcode;
    var quot: any;
    var div: number = 2;
    var rem: any;
    var temp: number[] = new Array(9);
    var temp2: number[] = new Array(9);
    var len: number = temp.length;
    var str: string = "";
    var k: number = 0;
    for (k = 0; num != 0; k++) {
      quot = num / div;
      quot = parseInt(quot);
      rem = num % div;
      rem = parseInt(rem);
      temp[k] = rem;
      num = quot;
    }

    for (let i = k; i < len; i++)
      temp[i] = 0;

    for (let i = len - 1, j = 0; i >= 0; i--, j++) {
      temp2[j] = temp[i];
    }

    for (let i = 0; i < len; i++)
      str += temp2[i];
    return str;
  }

  encryptPasswordWithoutRandom(oldPassword: string): string {
    var newPassword: string = "";
    var length = oldPassword.length;
    var temp: number[] = new Array(length);
    var i: number = 0;
    var ch;

    for (i = 0; i < length; i++) {
      ch = oldPassword.charCodeAt(i);
      temp[i] = parseInt("" + ch);

      if ((temp[i] >= 0) && (temp[i] < 64))
        temp[i] += 128;
      else if ((temp[i] >= 64) && (temp[i] < 128))
        temp[i] += 128;
      else if ((temp[i] >= 128) && (temp[i] < 192))
        temp[i] -= 128;
      else if ((temp[i] >= 192) && (temp[i] < 256))
        temp[i] -= 128;

      newPassword += this.convertToBoolean(temp[i]);
    }
    return newPassword;
  }

  registerSuccessfulLogin(
    email: string,
    token: string,
    domain: string,
    userId: number
  ) {
    if (isPlatformBrowser(this.platformId)) {
    sessionStorage.setItem(SESSION_STORAGE.USER_DATA, JSON.stringify({
      'email': email,
      'token': token,
      'username': email,
      'userId': userId,
      'domain': domain,
    }));
    sessionStorage.setItem(SESSION_STORAGE.TOKEN, JSON.stringify(token))
  }
  }

  afterLoginUserDetail(userId: number) {
    const httpParams = new HttpParams()
      .set('userId', userId);
    this.apiBaseUrl = this.configService.appConfig;
    const encodedUrl = encodeURI(`${this.apiBaseUrl}/afterLoginUserDetails`);
    return this.http.
      get(encodedUrl, { params: httpParams })
      .pipe(
        map(res => {
          if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem(SESSION_STORAGE.USER_DATA, JSON.stringify({
            'email': JSON.parse(JSON.stringify(res)).email,
            'fullName': JSON.parse(JSON.stringify(res)).fullName,
            'username': JSON.parse(JSON.stringify(res)).username,
            'userId': JSON.parse(JSON.stringify(res)).userId,
            'domain': JSON.parse(JSON.stringify(res)).domain,
            'role': JSON.parse(JSON.stringify(res)).role,
            'baseLangId': JSON.parse(JSON.stringify(res)).baseLanguage
          }));
          sessionStorage.setItem(SESSION_STORAGE.PREFERREDLANG, JSON.stringify(JSON.parse(JSON.stringify(res)).baseLanguage));
          sessionStorage.setItem(SESSION_STORAGE.USER_EMAIL, JSON.parse(JSON.stringify(res)).policyDetails.email);
          sessionStorage.setItem("baseLangId", JSON.parse(JSON.stringify(res)).baseLanguage)
        }
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }

  /**
   * @service to get captcha value.
   * @returns Observable
   */
  getCaptcha(): Observable<any> {
    this.apiBaseUrl = this.configService.appConfig;
    return this.http.get(`${this.apiBaseUrl}/${PATH.CAPTCHA}`);
  }

//   async loginImplicit() {
//     authConfig.redirectUri = this.configService.oktaRedirectUri;
//     this.oauthService.configure(authConfig);
//     this.oauthService.initImplicitFlow();
//     await this.oauthService.loadDiscoveryDocument();
//     sessionStorage.setItem('flow', 'implicit');
//     this.oauthService.initLoginFlow('/some-state;p1=1;p2=2?p3=3&p4=4');
//   }

  getParam() {
    if (isPlatformBrowser(this.platformId)) {
    const urlParams = new URLSearchParams(window.location.href).toString();
    if (urlParams.includes("id_token")) {
      const token = urlParams.split("=")[1].split("&")[0];
      const param = { 'token': token }
      this.httpservice.getDataWithParams(PATH.GET_OKTA_DATA, param).subscribe({
        next: resp => {
          const newUrl = resp.redirectUrl;
          window.location.href = newUrl;
        }
      })
    }
  }
}
}
