import { IcMArrowBack } from '@cogoport/icons-react';

import BasicDetailsForm from './components/BasicDetailsForm';
import styles from './styles.module.css';

function CreateQuestionSet() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.title}>New Question Set</div>
			</div>

			<BasicDetailsForm />
		</div>
	);
}

export default CreateQuestionSet;
