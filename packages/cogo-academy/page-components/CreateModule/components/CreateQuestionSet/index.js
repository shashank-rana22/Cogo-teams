import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetTestQuestionTest from '../../hooks/useGetTestQuestionTest';

import AddQuestionsForm from './components/AddQuestionsForm';
import BasicDetailsForm from './components/BasicDetailsForm';
import styles from './styles.module.css';

function CreateQuestionSet() {
	const [questionSetId, setQuestionSetId] = useState('');
	const [savedQuestionDetails, setSavedQuestionDetails] = useState([]);

	const [allKeysSaved, setAllKeysSaved] = useState(true);

	const {
		loading,
		data,
		getTestQuestionTest,
	} = useGetTestQuestionTest({ setSavedQuestionDetails, setAllKeysSaved });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.title}>New Question Set</div>
			</div>

			<BasicDetailsForm
				setQuestionSetId={setQuestionSetId}
				getTestQuestionTest={getTestQuestionTest}
				data={data}
				questionSetId={questionSetId}
			/>

			<AddQuestionsForm
				questionSetId={questionSetId}
				getTestQuestionTest={getTestQuestionTest}
				savedQuestionDetails={savedQuestionDetails}
				allKeysSaved={allKeysSaved}
				data={data}
				loading={loading}
				setSavedQuestionDetails={setSavedQuestionDetails}
				setAllKeysSaved={setAllKeysSaved}
			/>
		</div>
	);
}

export default CreateQuestionSet;
