import { createReducer, on } from '@ngrx/store';
import * as EmployeeFormActions from './employee-form.actions';

export interface EmployeeFormState {
  generalDetails: any;
  familyDetails: any;
  experienceEducationDetails: any;
  assetDocDetails: any;
  personalDetails: any;
}

export const initialState: EmployeeFormState = {
  generalDetails: {},
  familyDetails: {},
  experienceEducationDetails: {},
  assetDocDetails: {},
  personalDetails: {}
};

export const employeeFormReducer = createReducer(
  initialState,
  on(EmployeeFormActions.updateGeneralDetails, (state, { generalDetails }) => {
    console.log('Updating general details in reducer:', generalDetails);
    return {
      ...state,
      generalDetails: { ...state.generalDetails, ...generalDetails }
    };
  }),
  on(EmployeeFormActions.updateFamilyDetails, (state, { familyDetails }) => {
    console.log('Updating family Details in reducer:', familyDetails);
    return {
      ...state,
      familyDetails: { ...state.familyDetails, ...familyDetails }
    };
  }),
  on(EmployeeFormActions.updateExperienceEducationDetails, (state, { experienceEducationDetails }) => {
    console.log('Updating experienceEducation Details in reducer:', experienceEducationDetails);
    return {
      ...state,
      experienceEducationDetails: { ...state.experienceEducationDetails, ...experienceEducationDetails }
    };
  }),
  on(EmployeeFormActions.updateAssetDocDetails, (state, { assetDocDetails }) => {
    console.log('Updating assetDocDetails in reducer:', assetDocDetails);
    return {
      ...state,
      assetDocDetails: { ...state.assetDocDetails, ...assetDocDetails }
    };
  }),
  on(EmployeeFormActions.updatePersonalDetails, (state, { personalDetails }) => {
    console.log('Updating personal details in reducer:', personalDetails);
    return {
      ...state,
      personalDetails: { ...state.personalDetails, ...personalDetails }
    };
  }),
  on(EmployeeFormActions.resetForm, () => initialState)
);