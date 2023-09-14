import CREATE_FORM_STEPPER_KEYS_MAPPING from '../constants/create-form-stepper-keys-mapping';

const { SET_OBJECTIVE, REVIEW_OBJECTIVE, SET_OBJECTIVE_WEIGHTAGE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

const getStepperOptionsMapping = ({ t = () => {} }) => ([
	{
		key   : SET_OBJECTIVE,
		title : t('allocation:set_objectives'),
	},
	{
		key   : REVIEW_OBJECTIVE,
		title : t('allocation:review_objective'),
	},
	{
		key   : SET_OBJECTIVE_WEIGHTAGE,
		title : t('allocation:set_objective_weightage'),
	},
]);

export default getStepperOptionsMapping;
