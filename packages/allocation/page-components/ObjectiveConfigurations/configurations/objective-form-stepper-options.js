import CREATE_FORM_STEPPER_KEYS_MAPPING from '../constants/create-form-stepper-keys-mapping';

const { SET_OBJECTIVE, REVIEW_OBJECTIVE, SET_OBJECTIVE_WEIGHTAGE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

const STEPPER_OPTIONS_MAPPING = [
	{
		key   : SET_OBJECTIVE,
		title : 'Set Objectives',
	},
	{
		key   : REVIEW_OBJECTIVE,
		title : 'Review Objective',
	},
	{
		key   : SET_OBJECTIVE_WEIGHTAGE,
		title : 'Set Objective Weightage',
	},
];

export default STEPPER_OPTIONS_MAPPING;
