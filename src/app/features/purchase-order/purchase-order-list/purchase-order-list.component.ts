
import { ChangeDetectorRef, Component } from '@angular/core';
// import { ApplicationRoute } from '../../../shared/enums/application.enum';
import { debounceTime, of, Subject, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
// import { EmployeeService } from '../../../core/services/employee.service';
import { Router } from '@angular/router';
import { ApplicationRoutes } from '../../../shared/enums/routes.enum';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrl: './purchase-order-list.component.css'
})
export class PurchaseOrderListComponent {
  pageSize = 20;
  pageNumber = 0;
  employees: any[] = [];
  filteredEmployees: any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;

  unitIds: string[] = ['All'];
  employeeTypes: string[] = ['All'];
  employeeNames: string[] = ['All'];

  selectedUnitId: string = 'All';
  selectedEmployeeType: string = 'All';
  selectedEmployeeName: string = 'All';

  private searchSubject = new Subject<string>();

  constructor(
    private messageService: MessageService,
    // private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadEmployees();

    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(searchTerm => this.filterEmployees(searchTerm))
    ).subscribe(filteredEmployees => {
      this.filteredEmployees = filteredEmployees;
      console.log('filtered', filteredEmployees, this.filteredEmployees);
      this.cdr.markForCheck(); // Mark for check after filtering
    });
  }

  loadEmployees() {
    this.loading = true;
    // this.employeeService.getEmployees(this.pageSize, this.pageNumber).subscribe({
    //   next: (data) => {
    //     this.employees = data;
    //     console.log('loadEmployees data', data);
    //     this.filteredEmployees = data;
    //     this.totalRecords = data.length;
    //     this.loading = false;
    //     this.cdr.markForCheck(); // Mark for check after loading employees
    //   },
    //   error: (error) => {
    //     console.log('Error fetching employees:', error);
    //     this.loading = false;
    //   }
    // });
    this.employees = [
      {
        category: 'BOP',
        orderDate: '5 May 2023',
        poNumber: '11101001',
        totalValue: '$5,724,53',
        vendor: 'Technologies & Engineering (che)',
        rating: '4.9',
        raisedBy: 'Saurabh Sharma',
        approvedBy: 'Test',
        validity: '5 May 23 - 31 Dec 24'
      },
      {
        category: 'BOP',
        orderDate: '5 May 2023',
        poNumber: '11101001',
        totalValue: '$5,724,53',
        vendor: 'Technologies & Engineering (che)',
        rating: '4.9',
        raisedBy: 'Saurabh Sharma',
        approvedBy: 'Test',
        validity: '5 May 23 - 31 Dec 24'
      },
      {
        category: 'BOP',
        orderDate: '5 May 2023',
        poNumber: '11101001',
        totalValue: '$5,724,53',
        vendor: 'Technologies & Engineering (che)',
        rating: '4.9',
        raisedBy: 'Saurabh Sharma',
        approvedBy: 'Test',
        validity: '5 May 23 - 31 Dec 24'
      },
      {
        category: 'BOP',
        orderDate: '5 May 2023',
        poNumber: '11101001',
        totalValue: '$5,724,53',
        vendor: 'Technologies & Engineering (che)',
        rating: '4.9',
        raisedBy: 'Saurabh Sharma',
        approvedBy: 'Test',
        validity: '5 May 23 - 31 Dec 24'
      },
      {
        category: 'BOP',
        orderDate: '5 May 2023',
        poNumber: '11101001',
        totalValue: '$5,724,53',
        vendor: 'Technologies & Engineering (che)',
        rating: '4.9',
        raisedBy: 'Saurabh Sharma',
        approvedBy: 'Test',
        validity: '5 May 23 - 31 Dec 24'
      },
      
    ];
    this.filteredEmployees = this.employees;
    this.totalRecords = this.employees.length;
    this.loading = false;
    this.cdr.markForCheck();
  }

  // Pagination event handler
  onPageChange(event: any) {
    this.pageNumber = event.page;
    this.pageSize = event.rows;
    this.loadEmployees();  // Fetch the employees for the new page
  }


  filterEmployees(searchTerm: string) {
    if (!searchTerm) {
      return of(this.employees);
    }
    const filtered = this.employees.filter(employee =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filtered);
  }

  onSearch(event: any) {
    console.log(event.target.value)
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm);
  }

  getEmployeeDetailsByID(id: number) {
    // this.employeeService.getEmployeeById(id).subscribe({
    //   next: (data) => {
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching employee details:', error);
    //     this.loading = false;
    //   }
    // })
  }

  viewEmployee(id: number) {
    // this.router.navigate([ApplicationRoutes.EMPLOYEE_LIST, id]);
  }

  editEmployee(id: number) {
    // this.router.navigate([ApplicationRoutes.EMPLOYEE_LIST, id, 'edit']);
  }

  deleteEmployee(id: number) {
    // if (confirm('Are you sure you want to delete this employee?')) {
    //   this.employeeService.deleteEmployee(id).subscribe({
    //     next: () => {
    //       this.loadEmployees(); // Refresh the employee list
    //       this.cdr.markForCheck(); // Ensure change detection runs after deletion
    //     },
    //     error: (error) => {
    //       console.error('Error deleting employee:', error);
    //     }
    //   });
    // }
  }

  addPurchaseOrder() {
    this.router.navigate([ApplicationRoutes.GENERAL_DETAILS])
  }
}
