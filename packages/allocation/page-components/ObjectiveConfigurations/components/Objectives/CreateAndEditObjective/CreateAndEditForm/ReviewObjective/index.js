import { Button } from '@cogoport/components';

import ObjectiveDetailsCard from '../../../../../common/ObjectiveDetailsCard';
import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../../constants/create-form-stepper-keys-mapping';

import ReviewGeneralConfigCard from './ReviewGeneralConfigCard';
import styles from './styles.module.css';
// import useCreateObjective from './useCreateObjective';

const { SET_OBJECTIVE_WEIGHTAGE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

const { SET_OBJECTIVE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

function ReviewObjective(props) {
	const { formValues, setActiveStep } = props;

	const { generalConfiguration, objectiveRequirements } = formValues;

	// const { loading, onProceed } = useCreateObjective({ formValues, setActiveStep });

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<h3>Review Objective</h3>

				<p className={styles.subheading}>
					Check specifications of the Objective
					before setting weightage per User and sending Objective for Verification
				</p>
			</div>

			<ReviewGeneralConfigCard generalConfiguration={generalConfiguration} />

			<ObjectiveDetailsCard objectiveData={objectiveRequirements} />

			<div className={styles.button_container}>
				<Button
					type="button"
					themeType="link"
					onClick={() => setActiveStep(SET_OBJECTIVE)}
					// disabled={loading}
				>
					Back
				</Button>

				<Button
					type="button"
					themeType="primary"
					// loading={loading}
					onClick={() => setActiveStep(SET_OBJECTIVE_WEIGHTAGE)}
				>
					Procees & Set Waightage
				</Button>
			</div>
		</div>
	);
}

export default ReviewObjective;
