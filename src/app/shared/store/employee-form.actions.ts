import { createAction, props } from '@ngrx/store';

export const updateGeneralDetails = createAction(
  '[Employee Form] Update General Details',
  props<{ generalDetails: any }>()
);

export const updateFamilyDetails = createAction(
  '[Employee Form] Update Family Details',
  props<{ familyDetails: any }>()
);

export const updateExperienceEducationDetails = createAction(
  '[Employee Form] Update experienceEducation Details',
  props<{ experienceEducationDetails: any }>()
);

export const updateAssetDocDetails = createAction(
  '[Employee Form] Update assetDoc Details',
  props<{ assetDocDetails: any }>()
);

export const updatePersonalDetails = createAction(
  '[Employee Form] Update Personal Details',
  props<{ personalDetails: any }>()
);

export const resetForm = createAction('[Employee Form] Reset Form');