import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import ObjectiveDetailsCard from '../../../../common/ObjectiveDetailsCard';
import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../constants/create-form-stepper-keys-mapping';

import ReviewGeneralConfigCard from './ReviewGeneralConfigCard';
import styles from './styles.module.css';

const { SET_OBJECTIVE_WEIGHTAGE, SET_OBJECTIVE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

function ReviewObjective(props) {
	const { t } = useTranslation(['allocation']);

	const { formValues, setActiveStep } = props;

	const { generalConfiguration, objectiveRequirements } = formValues;

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<h3>{t('allocation:review_objective_title')}</h3>

				<p className={styles.subheading}>
					{t('allocation:check_specifications')}
				</p>
			</div>

			<ReviewGeneralConfigCard generalConfiguration={generalConfiguration} />

			<ObjectiveDetailsCard objectiveData={objectiveRequirements} />

			<div className={styles.button_container}>
				<Button
					size="lg"
					type="button"
					themeType="link"
					onClick={() => setActiveStep(SET_OBJECTIVE)}
				>
					{t('allocation:back_button')}
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="primary"
					onClick={() => setActiveStep(SET_OBJECTIVE_WEIGHTAGE)}
				>
					{t('allocation:proceed_set_weightage_button')}
				</Button>
			</div>
		</div>
	);
}

export default ReviewObjective;
