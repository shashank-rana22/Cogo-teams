import { Stepper } from '@cogoport/components';

import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../constants/create-form-stepper-keys-mapping';

import styles from './styles.module.css';

const { SET_OBJECTIVE, REVIEW_OBJECTIVE, SET_OBJECTIVE_WEIGHTAGE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

const STEPPER_MAPPING = [
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

function CreateAndEditForm() {
	return (
		<section className={styles.container}>
			<div className={styles.stepper_container}>
				<Stepper className={styles.stepper} items={STEPPER_MAPPING} />
			</div>
		</section>
	);
}

export default CreateAndEditForm;
