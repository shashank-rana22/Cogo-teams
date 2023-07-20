import ObjectiveDetailsCard from '../../../../../common/ObjectiveDetailsCard';

import ReviewGeneralConfigCard from './ReviewGeneralConfigCard';
import styles from './styles.module.css';

function ReviewObjective(props) {
	const { formValues } = props;

	const { generalConfiguration, objectiveRequirements } = formValues;

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
		</div>
	);
}

export default ReviewObjective;
