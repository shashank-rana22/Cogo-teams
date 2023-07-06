import { Stepper } from '@cogoport/components';
import { useState } from 'react';

import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../constants/create-form-stepper-keys-mapping';

import ReviewObjective from './ReviewObjective';
import SetObjective from './SetObjective';
import SetObjectiveWeightage from './SetObjectiveWeightage';
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

const STEPPER_COMPONENT_MAPPING = {
	[SET_OBJECTIVE]           : <SetObjective />,
	[REVIEW_OBJECTIVE]        : <ReviewObjective />,
	[SET_OBJECTIVE_WEIGHTAGE] : <SetObjectiveWeightage />,
};

function CreateAndEditForm() {
	const [activeStep, setActiveStep] = useState(SET_OBJECTIVE);

	return (
		<section className={styles.container}>
			<div className={styles.stepper_container}>
				<Stepper
					className={styles.stepper}
					items={STEPPER_MAPPING}
					active={activeStep}
					setActive={setActiveStep}
					enableForwardClick
				/>
			</div>

			{STEPPER_COMPONENT_MAPPING[activeStep]}
		</section>
	);
}

export default CreateAndEditForm;
