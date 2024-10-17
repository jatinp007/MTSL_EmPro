import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeFormState } from './employee-form.reducer';

/* export const selectEmployeeFormState = createFeatureSelector<EmployeeFormState>('employeeForm'); */

export const selectEmployeeFormState = (state: any) => state.employeeForm;

export const selectGeneralDetails = createSelector(
  selectEmployeeFormState,
  (state: EmployeeFormState) => state.generalDetails
);

export const selectFamilyDetails = createSelector(
  selectEmployeeFormState,
  (state: EmployeeFormState) => state.familyDetails
);

export const selectExperienceEducationDetails = createSelector(
  selectEmployeeFormState,
  (state: EmployeeFormState) => state.experienceEducationDetails
);

export const selectAssetDocDetails = createSelector(
  selectEmployeeFormState,
  (state: EmployeeFormState) => state.assetDocDetails
);

export const selectPersonalDetails = createSelector(
  selectEmployeeFormState,
  (state: EmployeeFormState) => state.personalDetails
);

export const selectAllEmployeeDetails = createSelector(
  selectGeneralDetails,
  selectFamilyDetails,
  selectExperienceEducationDetails,
  selectAssetDocDetails,
  selectPersonalDetails,
  (generalDetails, selectFamilyDetails, selectExperienceEducationDetails, selectAssetDocDetails, personalDetails) => ({
    ...generalDetails,
    ...selectFamilyDetails,
    ...selectExperienceEducationDetails,
    ...selectAssetDocDetails,
    ...personalDetails
  })
);