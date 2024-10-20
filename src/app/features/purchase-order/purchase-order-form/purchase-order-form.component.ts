
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';
// import { EmployeeService } from '../../services/employee.service';
import { Store } from '@ngrx/store';
import * as EmployeeFormActions from '../../../shared/store/employee-form.actions';
import { selectAllEmployeeDetails } from '../../../shared/store/employee-form.selectors';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs/internal/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralDetailsComponent } from './general-details/general-details.component';
import { Subscription } from 'rxjs';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { ApplicationRoutes } from '../../../shared/enums/routes.enum';



@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrl: './purchase-order-form.component.css'
})

export class PurchaseOrderFormComponent implements OnInit, AfterViewInit {
  private subscription!: Subscription;
  // employeeData!: EmployeeData;

  steps: MenuItem[];
  activeIndex: number = 0;
  isEditMode: boolean = false;
  id: number | null = null;
  employeeDetails$!: Observable<any>;

  @ViewChild(GeneralDetailsComponent)
  generalDetailsComponent!: GeneralDetailsComponent;
  @ViewChild(MaterialDetailsComponent)
  MaterialDetailsComponent!: MaterialDetailsComponent;

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  
    private messageService: MessageService,

  ) {
    // this.employeeDetails$ = this.store.select(selectAllEmployeeDetails);
    this.steps = [
      { label: 'General Details', routerLink: 'general-details' },
      { label: 'Supplier & Payment Details', routerLink: 'supplier-payment-details' },
      { label: 'Material Details', routerLink: 'material-details' },
      { label: 'Taxes & Charges Details', routerLink: 'taxes-charges-details' },
      { label: 'Confirmation', routerLink: 'confirmation' },
    ];
  }

  ngOnInit() {
    // this.checkRouteForEditMode();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveIndex();
      });

  //   this.subscription = this.store.select(selectAllEmployeeDetails).subscribe((details) => {
  //     this.employeeData = details;
  //     console.log('All employeeData Details:', this.employeeData);
  //   });
  }

  ngAfterViewInit() {
    console.log('General Details Component:', this.generalDetailsComponent);
   
  }


  private checkRouteForEditMode() {
    // const urlSegments = this.router.url.split('/');
    // const isEditRoute = urlSegments.includes('edit');
    // this.route.paramMap.pipe(take(1)).subscribe((params) => {
    //   const idParam = params.get('id');
    //   this.id = idParam ? parseInt(idParam, 10) : null;
    //   this.isEditMode = isEditRoute && this.id !== null;
    //   if (this.isEditMode) {
    //     this.loadEmployeeData();
    //   } else {
    //     this.store.dispatch(EmployeeFormActions.resetForm());
    //   }
    // });
  }

  private updateActiveIndex() {
    const currentUrl = this.router.url;
    const activeStep = this.steps.findIndex((step) =>
      currentUrl.includes(step.routerLink!)
    );
    console.log('currentUrl', currentUrl);
    console.log('this.steps', this.steps);
    console.log('activeStep', activeStep);
    if (activeStep !== -1) {
      this.activeIndex = activeStep;
    }
  }


  nextStep() {
    // Check if the current step is General Details
    if (this.activeIndex === 0) {
      // General Details
      // if (
      //   !this.generalDetailsComponent ||
      //   !this.generalDetailsComponent.form.valid
      // ) {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Error',
      //     detail: 'Please fill in all required fields in General Details.',
      //   });
      //   return; // Prevent moving to the next step
      // }
    }
    // Check if the current step is Personal Details
    else if (this.activeIndex === 1) {
      // Personal Details
      // if (
      //   !this.personalDetailsComponent ||
      //   !this.personalDetailsComponent.form.valid
      // ) {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Error',
      //     detail: 'Please fill in all required fields in Personal Details.',
      //   });
      //   return; // Prevent moving to the next step
      // }
    }

    // Move to the next step if validations pass
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
      this.navigateToStep(this.activeIndex);
    }
  }

  prevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.navigateToStep(this.activeIndex);
    }
  }

  private navigateToStep(index: number) {
    const route = this.steps[index].routerLink;
    if (this.isEditMode && this.id) {
      this.router.navigate([`/purchase-order/${this.id}/edit/${route}`]);
    } else {
      this.router.navigate([`/purchase-order/create/${route}`]);
    }
  }

  saveEmployee() {
    // this.store
    //   .select(selectAllEmployeeDetails)
    //   .pipe(take(1))
    //   .subscribe((employeeData) => {

    //     if (this.isEditMode && this.id !== null) {
    //       this.employeeService
    //         .updateEmployee(this.id, employeeData)
    //         .subscribe({
    //           next: () => {
    //             this.messageService.add({
    //               severity: 'success',
    //               summary: 'Success',
    //               detail: 'Employee updated successfully',
    //             });
    //             this.router.navigate([RouteMt.EMPLOYEE_LIST]);
    //           },
    //           error: (error) => {
    //             console.error('Error updating employee:', error);
    //             this.messageService.add({
    //               severity: 'error',
    //               summary: 'Error',
    //               detail: 'Failed to update employee',
    //             });
    //           },
    //         });
    //     } else {
    //       this.employeeService.addEmployee(employeeData).subscribe({
    //         next: () => {
    //           this.messageService.add({
    //             severity: 'success',
    //             summary: 'Success',
    //             detail: 'Employee added successfully',
    //           });
    //           this.router.navigate([RouteMt.EMPLOYEE_LIST]);
    //         },
    //         error: (error: any) => {
    //           console.error('Error creating employee:', error);
    //           this.messageService.add({
    //             severity: 'error',
    //             summary: 'Error',
    //             detail: 'Failed to add employee',
    //           });
    //         },
    //       });
    //     }
    //   });
  }

  private formatDate(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  sendForApproval() {
    // this.employeeFormService.postAllEmployees(this.employeeData) // Call the service method
    //   .subscribe({
    //     next: (response) => {
    //       console.log('Response from postAllEmployees:', response);
    //     },
    //     error: (err) => {
    //       console.error('Error posting employee data:', err);
    //     }
    //   });

    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'Info',
    //   detail: 'Dummy sent for approval ',
    // });
    this.router.navigate([ApplicationRoutes.PURCHASE_ORDER]);
  }
}
