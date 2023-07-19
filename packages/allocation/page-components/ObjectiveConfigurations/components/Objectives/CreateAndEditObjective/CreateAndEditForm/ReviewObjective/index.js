// import formvalues from '../../../../../../../formvalues';
import ObjectiveDetailsCard from '../../../../../common/ObjectiveDetailsCard';

import styles from './styles.module.css';

function ReviewObjective(props) {
	const { formValues } = props;

	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>Review Objective</h3>

			<p>
				Check specifications of the Objective
				before setting weightage per User and sending Objective for Verification
			</p>

			<ObjectiveDetailsCard objectiveData={formValues.objectiveRequirements} />
		</div>
	);
}

export default ReviewObjective;
