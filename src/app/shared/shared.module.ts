import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { employeeFormReducer } from './store/employee-form.reducer';
import { EmployeeFormEffects } from './store/employee-form.effects';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { HeaderComponent } from '../layout/header/header.component';
import { ToastModule } from 'primeng/toast';
import { PrimeNGModule } from '../primeng/primeng.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,  
    PrimeNGModule,
    FormsModule,
    // StoreModule.forFeature('employeeForm', employeeFormReducer),
    // EffectsModule.forFeature([EmployeeFormEffects])
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    ToastModule
  ]
})
export class SharedModule { }