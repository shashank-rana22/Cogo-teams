import { Stepper } from '@cogoport/components';
import { useState, useEffect } from 'react';

import STEPPER_OPTIONS_MAPPING from '../../../../configurations/objective-form-stepper-options';
import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../constants/create-form-stepper-keys-mapping';

import ReviewObjective from './ReviewObjective';
import SetObjective from './SetObjective';
import SetObjectiveWeightage from './SetObjectiveWeightage';
import styles from './styles.module.css';

const { SET_OBJECTIVE, REVIEW_OBJECTIVE, SET_OBJECTIVE_WEIGHTAGE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

function CreateAndEditForm(props) {
	const { activeTabDetails } = props;

	const [activeStep, setActiveStep] = useState(SET_OBJECTIVE);
	const [formValues, setFormValues] = useState(
		{
			generalConfiguration  : { selectMode: 'select_all', user_ids: [] },
			objectiveRequirements : {},
		},
	);

	const STEPPER_COMPONENT_MAPPING = {
		[SET_OBJECTIVE]: <SetObjective
			formValues={formValues}
			setFormValues={setFormValues}
			setActiveStep={setActiveStep}
		/>,
		[REVIEW_OBJECTIVE]: <ReviewObjective
			formValues={formValues}
			setActiveStep={setActiveStep}
		/>,
		[SET_OBJECTIVE_WEIGHTAGE]: <SetObjectiveWeightage
			activeTabDetails={activeTabDetails}
			formValues={formValues}
			setActiveStep={setActiveStep}
		/>,
	};

	useEffect(() => {
		console.log('formValues :: ', formValues);
	}, [formValues]);

	return (
		<section className={styles.container}>
			<div className={styles.stepper_container}>
				<Stepper
					className={styles.stepper}
					items={STEPPER_OPTIONS_MAPPING}
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
