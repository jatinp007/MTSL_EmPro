import { Component, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ConfigService } from '../../../core/services/config.service';
import { ToastService } from '../../../core/services/toast.service';
import { ApplicationRoutes } from '../../../shared/enums/routes.enum';
import { CONSTANTS, ERROR_CODES, TOAST_TYPE } from '../../../shared/constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private className: string = 'active-class';
  isPasswordVisible: boolean = false;
  loginForm !: FormGroup;
  captchaShowCount: number = 0;
  captchaConfigCount!: number;
  captchaValue: string = 'xuVw39O';
  showCaptcha: boolean = true;
  showCaptchaAtVerifyUser: boolean = true;
  loginSubscription: Subject<any> = new Subject();
  userId!: string;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private fb: FormBuilder,
    private configService: ConfigService,
    private authService: AuthenticationService,
    private toast: ToastService,
  ) {
    this.isLoggedIn();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(document.body, this.className);
    }

    //this.getCaptcha();
    this.initLoginForm();
  }

  submit() {
    this.router.navigate([ApplicationRoutes.VERIFICATION_CODE]);
  }

  getCaptcha() {
    this.configService.hitCaptcha.subscribe({
      next: (res) => {
        if (res) {
          this.getCaptchaFromServer();
        }
      }
    });
  }

  getCaptchaFromServer(): void {
    this.captchaValue = '';
    this.authService.getCaptcha().subscribe({
      next: (res) => {
        this.captchaValue = JSON.parse(JSON.stringify(res)).Captcha;
        const isPassPolicyAccepted = res.Passwordsetting.enablecaptcha;
        this.loginForm.controls['captcha'].patchValue('');
        if (isPassPolicyAccepted == 1) {
          this.showCaptchaAtVerifyUser = false;
          // this.showCaptcha = true;
        } else if (isPassPolicyAccepted == 0) {
          this.showCaptchaAtVerifyUser = true;
          this.showCaptcha = true;
        }
        this.captchaConfigCount = res.Passwordsetting.maxBadLoginAttempts;
      }
    })
  }

  onLoginClick() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.controls['username'].value.trim();
    const captchaValue = this.loginForm.controls['captcha'].value;

    // Check if captcha is needed and valid
    if (this.showCaptchaAtVerifyUser && !captchaValue) {
      this.toast.show('Please Enter Captcha', TOAST_TYPE.ERROR);
      return;
    } else if (this.showCaptchaAtVerifyUser && captchaValue !== this.captchaValue) {
      this.toast.show('Wrong Captcha Entered', TOAST_TYPE.ERROR);
      this.getCaptcha();
      return;
    }

    // Call verifyUser first
    this.authService.verifyUser(username).subscribe({
      next: (res: any) => {
        if (res.status === ERROR_CODES.VERIFIED_STATUS) {
          this.userId = res.response.userId;

          // Proceed with login after successful verification
          this.performLogin();
        } else {
          // Handle different error statuses
          this.handleVerifyUserError(res.status);
        }
      },
      error: (errorResponse: HttpErrorResponse) => {
        alert(CONSTANTS.INVALID_LOGIN_CREDENTIALS);
        this.getCaptcha();
      }
    });
  }

  performLogin() {
    const password = this.authService.encryptPassword(this.loginForm.get('password')?.value);

    this.authService.login(this.loginForm.get('username')?.value.trim(), password, this.userId)
      .pipe(takeUntil(this.loginSubscription))
      .subscribe({
        next: data => {
          if (data) {
            // Handle successful login response
            this.handleLoginResponse(data);
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          // Handle login error response
        }
      });
  }

  handleVerifyUserError(status: string) {
    switch (status) {
      case '0001':
        this.toast.show('User does not exist.', TOAST_TYPE.ERROR);
        break;
      case '0002':
        this.toast.show('User account deleted.', TOAST_TYPE.ERROR);
        break;
      case '0003':
        this.toast.show('User is inactive.', TOAST_TYPE.ERROR);
        break;
      default:
        this.toast.show('An unknown error occurred.', TOAST_TYPE.ERROR);
    }
  }

  handleLoginResponse(data: any) {
    // Handle successful login logic here
    if (data.selectedAppId != null) {
      localStorage.setItem("selectedAppId", data.selectedAppId);
    } else {
      this.toast.show(CONSTANTS.APPNOTASSIGNED, TOAST_TYPE.ERROR);
    }

    if (data.validateUserPwd.body.status === '0007') {
      this.toast.show(CONSTANTS.WRONG_USERNAME_PASSWORD, TOAST_TYPE.ERROR);
      // Handle captcha logic if needed
    } else if (data.policyDetails.tempPwd === "1") {
      this.toast.show(CONSTANTS.TEMP_PWD_ALERT, TOAST_TYPE.ERROR);
      this.loginForm.reset();
      // Clear session storage if needed
    } else if (data.policyDetails.isPolicyValue === "0" && data.policyDetails.policyIsDisable === "0") {
      this.router.navigate(['/policy']);
    } else if (data.validateUserPwd.body.status === '0008') {
      this.toast.show(data.validateUserPwd.body.message, TOAST_TYPE.ERROR);
    } else if (data.validateUserPwd.body.status === '0006') {
      // Successful login handling
    }
  }

  /**
    * @function to navigate on dashboard if user is already logged in
    * @returns void
    */
  isLoggedIn(): void {
    if (!this.authService.isLoggedIn()) return;
    else {
      this.router.navigate(['/dashboard'])
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: [''],
      prefferedLanguage: ['', []]
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.removeClass(document.body, this.className);
    }
  }
}
