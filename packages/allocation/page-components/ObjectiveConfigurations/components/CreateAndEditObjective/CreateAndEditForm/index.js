import { Stepper } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getStepperOptionsMapping from '../../../configurations/objective-form-stepper-options';
import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../constants/create-form-stepper-keys-mapping';

import ReviewObjective from './ReviewObjective';
import SetObjective from './SetObjective';
import SetObjectiveWeightage from './SetObjectiveWeightage';
import styles from './styles.module.css';

const { SET_OBJECTIVE, REVIEW_OBJECTIVE, SET_OBJECTIVE_WEIGHTAGE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

function CreateAndEditForm(props) {
	const { t } = useTranslation(['allocation']);

	const { activeMode, setActiveMode, defaultFormValues, flushRefCallback } = props;

	const [activeStep, setActiveStep] = useState(SET_OBJECTIVE);

	const [formValues, setFormValues] = useState(defaultFormValues);

	const stepperOptionsMapping = getStepperOptionsMapping({ t });

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
			activeMode={activeMode}
			setActiveMode={setActiveMode}
			formValues={formValues}
			setActiveStep={setActiveStep}
			flushRefCallback={flushRefCallback}
		/>,
	};

	return (
		<section className={styles.container}>
			<div className={styles.stepper_container}>
				<Stepper
					className={styles.stepper}
					items={stepperOptionsMapping}
					active={activeStep}
					setActive={setActiveStep}
				/>
			</div>

			{STEPPER_COMPONENT_MAPPING[activeStep]}
		</section>
	);
}

export default CreateAndEditForm;
