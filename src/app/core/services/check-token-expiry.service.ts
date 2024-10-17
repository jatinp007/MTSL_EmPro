// import { BehaviorSubject, Observable } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';
// import { Router } from '@angular/router';
// import { Injectable, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { HttpClient, HttpParams } from '@angular/common/http';

// import { ConfigService } from './config.service';
// import { SessionExpiryDialogComponent } from '../../components/session-expiry-dialog/session-expiry-dialog.component';
// import { SingleActionDialogComponent } from '../../components/single-action-dialog/single-action-dialog.component';
// import { PATH, SESSION_STORAGE } from 'src/app/shared/constants/constans';
// import { SINGLE_ACTION_DIALOG_DICT } from 'src/app/shared/model/session-expiry-dialog.model';
// import { CommonService } from '../services/common.service';
// import { DialogService } from './dialog.service';
// import { HttpService } from './http.service';
// import { GET_DICTIONARY_PAYLOAD } from 'src/app/shared/model/shared.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CheckTokenExpiryService implements OnInit {

//   //Observable to check if user has logged out.
//   isUserLoggedout: BehaviorSubject<boolean> = new BehaviorSubject(true);
//   //Observable to check if idle timeout dialog is open.
//   isIdleDialogOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
//   //Observable to check if session continued from idle timeout dialog.
//   continueFromIdle: BehaviorSubject<boolean> = new BehaviorSubject(false);
//   //Observable to check if user is loggedin and start idle timeout.
//   isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
//   //Observable to check if dialog box is closed by dialog service.
//   autoClosed: BehaviorSubject<boolean> = new BehaviorSubject(false);
//   //Observable to check if data has been saved in session storage.
//   isDataAvailable: BehaviorSubject<boolean> = new BehaviorSubject(false);

//   //Variable to store timeout session.
//   expiryTimeout: string | number | NodeJS.Timeout | undefined;
//   //App Url for SSO API call.
//   admUrl!: string;
//   //User Details.
//   userDetails: any;
//   //Flag to check if user has logged out.
//   isUserLoggedOut: boolean = false;
//   //Flag to check if session is refreshed through idle timeout.
//   isContinueFromIdle: boolean = false;
//   //Base Language Id of User.
//   baseLangId!: number;
//   //Base Panel Id.
//   //Time Before token expires.
//   timeBeforeTokenExpiryWarning: number = (1 * 60 * 1000);
//   //Boolean to set show dialog
//   showSessionExpiryDialog: boolean = true;
//   //Boolean to check if Ideal Screen Dialog box is open.
//   isIdelDialogBoxOpen: boolean = false;
//   //Config Reasponse Data.
//   parsedJson!: any;

//   //Get Dictionary Data Payload.
//   dictionaryData: GET_DICTIONARY_PAYLOAD = {
//     languageId: 0,
//     appId: "0",
//     dictionaryCodes: [],
//   };
//   //Dictionary Labels for Single Action Dialog Box.
//   singleActionDialogBoxLabels = {
//     sessionExpired: '',
//     yourSessionIsExpired: '',
//     login: ''
//   }
//   //JWT Token Expiry Time.
//   private expiryTime!: number;

//   constructor(
//     private http: HttpClient,
//     private configService: ConfigService,
//     private dialog: MatDialog,
//     private router: Router,
//     private commonService: CommonService,
//     private dialogService: DialogService,
//     private httpService: HttpService
//   ) {
//     this.continueFromIdle.subscribe({
//       next: (res) => {
//         if (res) {
//           this.isContinueFromIdle = res;
//         }
//       }
//     });
//     this.isIdleDialogOpen.subscribe({
//       next: (res) => {
//         this.isIdelDialogBoxOpen = res;
//       }
//     })
//     this.isDataAvailable.subscribe({
//       next: (res) => {
//         if (res) {
//           this.getAllAdmSysConfig();
//         }
//       }
//     })
//   }

//   ngOnInit(): void { }

//   /**
//  * @Service to get user details to sso token generation.
//  * @param winUserId.
//  * @param domain.
//  * @returns Observable.
//  */
//   getUserDetailsForSSOBsp(winUserId: string, domain: string): Observable<any> {
//     this.admUrl = this.configService.appConfig;
//     const httpParams = new HttpParams()
//       .set('winUserId', winUserId)
//       .set('domain', domain);

//     const encodedUrl = encodeURI(`${this.admUrl}/genrateSSO`);
//     return this.http.get(encodedUrl, { params: httpParams });
//   }

//   /**
//  * @Service to generate sso token.
//  * @param winUserId.
//  * @param domain.
//  * @param uuid.
//  * @returns Observable.
//  */
//   generateSSOForAdminBsp(winUserId: string, domain: string, uuid: string): Observable<any> {
//     const encodedUrl = encodeURI(`${this.admUrl}/genrateSSOURL`);
//     const httpParams = new HttpParams()
//       .set('winUserId', winUserId)
//       .set('domain', domain)
//       .set('uuid', uuid);
//     return this.http.get(encodedUrl, { params: httpParams });
//   }

//   /**
//  * @Service to start session timeout timer based on JWT token expiry time.
//  * @param JWT token from local storage.
//  * @returns void.
//  */
//   startSession(token: string): void {

//     if (this.isContinueFromIdle) {
//       clearTimeout(this.expiryTimeout);
//     }

//     this.isUserLoggedOut = false;
//     this.isUserLoggedout.next(false);
//     const decodedToken: any = jwtDecode(token);
//     this.expiryTime = decodedToken.exp * 1000;

//     localStorage.setItem('expiryTime', this.expiryTime.toString());

//     const now = Date.now();
//     const timeUntilExpiry = this.expiryTime - now;
//     const timeUntilWarning = timeUntilExpiry - this.timeBeforeTokenExpiryWarning; // Time before expiry.

//     if (this.showSessionExpiryDialog) {
//       this.expiryTimeout = setTimeout(() => this.showExpiryDialog(), timeUntilWarning);
//       this.continueFromIdle.next(false);
//     }
//     if (!this.showSessionExpiryDialog) {
//       this.expiryTimeout = setTimeout(() => this.logout(), timeUntilExpiry);
//       this.continueFromIdle.next(false);
//     }
//   }

//   /**
//  * @Service to show session expiry dialog box before configured time.
//  * @returns void.
//  */
//   private showExpiryDialog(): void {
//     this.isUserLoggedout.subscribe({
//       next: (res) => { this.isUserLoggedOut = res; }
//     });

//     if (this.isUserLoggedOut) {
//       clearTimeout(this.expiryTimeout);
//       return;
//     }

//     if (this.showSessionExpiryDialog) {

//       this.getDictionaryData();

//       localStorage.setItem('showExpiryDialog', 'true');
//       const dialogRef = this.dialogService.openDialog(SessionExpiryDialogComponent, {
//         disableClose: true,
//         width: '25%',
//         data: { expiryTime: this.expiryTime }
//       });

//       dialogRef.afterClosed().subscribe(result => {
//         localStorage.removeItem('showExpiryDialog');
//         if (result === 'continue') {
//           localStorage.setItem('continueSession', 'true');
//           this.extendSession();
//         } else if (result === 'logout') {
//           localStorage.setItem('logoutSession', 'true');
//           this.logout();
//         } else if (result === 'timeExpired') {
//           localStorage.setItem('sessionExpired', 'true');
//           const dialogData = {
//             title: this.singleActionDialogBoxLabels.sessionExpired,
//             content: this.singleActionDialogBoxLabels.yourSessionIsExpired,
//             buttonText: this.singleActionDialogBoxLabels.login
//           };
//           const token = sessionStorage.getItem('token');
//           const decodedToken: any = jwtDecode((token!).toString());
//           const isExpired = decodedToken.exp < Date.now() / 1000;
//           if (isExpired) {
//             this.isUserLoggedout.next(true);
//             this.isUserLoggedIn.next(false);
//             localStorage.clear();
//             sessionStorage.clear();
//             const singleActionDialogRef = this.dialogService.openDialog(SingleActionDialogComponent, {
//               disableClose: true,
//               width: '25%',
//               data: dialogData
//             });

//             singleActionDialogRef.afterClosed().subscribe(result => {
//               if (result === 'confirmed') {
//                 this.router.navigate(['/login']);
//                 this.configService.hitCaptcha.next(true);
//                 this.autoClosed.next(false);
//                 this.dialog.closeAll();
//               }
//             });
//           }
//         }
//       });
//     }
//   }

//   /**
//  * @Service to extend session by setting up fresh token.
//  * @returns void.
//  */
//   extendSession(): void {
//     this.userDetails = localStorage.getItem('userdata');
//     const winUserId = JSON.parse(sessionStorage.getItem('userdata')!).username;
//     const domain = JSON.parse(this.userDetails).domain;
//     this.getUserDetailsForSSOBsp(winUserId, domain).subscribe({
//       next: (response) => {
//         const uuid = response.uuid;
//         const winUserId = response.winUserId;
//         const domain = response.domain;
//         this.generateSSOForAdminBsp(winUserId, domain, uuid).subscribe({
//           next: (res: any) => {
//             let token: any = this.getTokenFromUrl(res.redirectUrl);
//             token = JSON.stringify(token);
//             sessionStorage.setItem('token', token);
//             localStorage.setItem('token', token);
//             const currentRoute = this.router.url;
//             this.router.navigate([currentRoute]);
//             this.startSession(token);
//             this.autoClosed.next(false);
//           }
//         });
//       }
//     });
//   }

//   /**
//  * @Service to logout user, clear local and session storage and redirect to login screen.
//  * @returns void.
//  */
//   logout(): void {

//     if (!this.showSessionExpiryDialog) {
//       const dialogData = {
//         title: 'Session Expired.',
//         content: 'Your Session is expired.',
//         buttonText: 'Login.'
//       };
//       this.isUserLoggedout.next(true);
//       const singleActionDialogRef = this.dialog.open(SingleActionDialogComponent, {
//         disableClose: true,
//         width: '25%',
//         data: dialogData
//       });
//       singleActionDialogRef.afterClosed().subscribe(result => {
//         if (result === 'confirmed') {
//           sessionStorage.clear();
//           localStorage.clear();
//           this.configService.hitCaptcha.next(true);
//           this.router.navigate(['/login']);
//           this.isUserLoggedIn.next(false);
//           this.dialog.closeAll();
//           this.autoClosed.next(false);
//         }
//       });
//     }

//     if (this.showSessionExpiryDialog) {
//       this.isUserLoggedout.next(true);
//       sessionStorage.clear();
//       localStorage.clear();
//       this.configService.hitCaptcha.next(true);
//       this.router.navigate(['/login']);
//       this.isUserLoggedIn.next(false);
//       clearTimeout(this.expiryTimeout);
//       this.dialog.closeAll();
//       this.autoClosed.next(false);
//     }
//   }

//   /**
//  * @Service to extract token from URL returned by sso service.
//  * @param url generated by sso service.
//  * @returns srting.
//  */
//   getTokenFromUrl(url: string): string | null {
//     const tokenKey = 'TOKEN=';
//     const startIndex = url.indexOf(tokenKey);
//     if (startIndex !== -1) {
//       const tokenPart = url.substring(startIndex + tokenKey.length);
//       const endIndex = tokenPart.indexOf('&');
//       return endIndex === -1 ? tokenPart : tokenPart.substring(0, endIndex);
//     }
//     return null;
//   }

//   /**
// * @function to get dictionary data.
// * @returns void.
// */
//   getDictionaryData(): void {
//     this.baseLangId = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.USER_DATA)!).baseLangId;
//     const appId = JSON.parse(localStorage.getItem("selectedAppId")!);
//     this.dictionaryData.languageId = this.baseLangId;
//     this.dictionaryData.appId = appId;
//     this.dictionaryData.dictionaryCodes = SINGLE_ACTION_DIALOG_DICT

//     this.commonService.getDictionaryByLangPanelDictIds(this.dictionaryData).subscribe({
//       next: (res: { status: string; data: any[]; }) => {
//         if (res.status === 'success') {
//           this.singleActionDialogBoxLabels.sessionExpired = res?.data?.find((data: any) => data.dictionaryCode == 501)?.value;
//           this.singleActionDialogBoxLabels.yourSessionIsExpired = res?.data?.find((data: any) => data.dictionaryCode == 502)?.value;
//           this.singleActionDialogBoxLabels.login = res?.data?.find((data: any) => data.dictionaryCode == 503)?.value;
//         }
//       }
//     })
//   }

//   /**
//  * @service to get configuration data.
//  * @param userEmail.
//  * @param superAdminEmail.
//  * @param bspAdminEMail.
//  * @returns observable.
//  */
//   getAllSysConfigList(params: { [x: string]: any } | undefined): Observable<any> {
//     return this.httpService.getDataWithParams(PATH.GET_CONFIGDETAILS, params);
//   }

//   /**
// * @function to get list of all configuration in ADM tab.
// * @returns void.
// */
//   getAllAdmSysConfig() {
//     const appId = JSON.parse(localStorage.getItem("selectedAppId")!);
//     const token = JSON.parse(localStorage.getItem(SESSION_STORAGE.TOKEN)!);
//     let params = { appId: appId }
//     this.getAllSysConfigList(params).subscribe({
//       next: (res) => {

//         this.parsedJson = res;
//         if (this.parsedJson != "0") {
//           this.timeBeforeTokenExpiryWarning = +this.parsedJson.BSP_Time_Before_Token_Expiry_Warning.split('|')[0];

//           const showIdealDialogBox = this.parsedJson.BSP_Show_Session_Expiry_Dialog.split('|')[0];
//           if (showIdealDialogBox == "True") {
//             this.showSessionExpiryDialog = true;
//           }
//           if (showIdealDialogBox == "False") {
//             this.showSessionExpiryDialog = false;
//           }
//         }

//         this.startSession(token);
//       }
//     })
//   }
// }
