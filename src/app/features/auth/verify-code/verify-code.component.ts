import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationRoutes } from '../../../shared/enums/routes.enum';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {
  constructor(private router: Router){}
  submit() {
    this.router.navigate([ApplicationRoutes.PURCHASE_ORDER]);
  }

}
