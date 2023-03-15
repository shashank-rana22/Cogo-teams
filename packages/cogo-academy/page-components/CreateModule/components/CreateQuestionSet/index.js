import { IcMArrowBack } from '@cogoport/icons-react';

import AddQuestionsForm from './components/AddQuestionsForm';
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

			<AddQuestionsForm />
		</div>
	);
}

export default CreateQuestionSet;
