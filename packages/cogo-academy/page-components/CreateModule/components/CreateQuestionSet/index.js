import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import AddQuestionsForm from './components/AddQuestionsForm';
import BasicDetailsForm from './components/BasicDetailsForm';
import styles from './styles.module.css';

function CreateQuestionSet() {
	const [questionSetId, setQuestionSetId] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.title}>New Question Set</div>
			</div>

			<BasicDetailsForm setQuestionSetId={setQuestionSetId} />

			<AddQuestionsForm questionSetId={questionSetId} />
		</div>
	);
}

export default CreateQuestionSet;
