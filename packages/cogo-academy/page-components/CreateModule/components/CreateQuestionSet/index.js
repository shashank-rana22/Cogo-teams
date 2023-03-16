import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetTestQuestionTest from '../../hooks/useGetTestQuestionTest';

import AddQuestionsForm from './components/AddQuestionsForm';
import BasicDetailsForm from './components/BasicDetailsForm';
import styles from './styles.module.css';

function CreateQuestionSet() {
	const router = useRouter();

	const [questionSetId, setQuestionSetId] = useState('');
	const [savedQuestionDetails, setSavedQuestionDetails] = useState([]);
	const [editDetails, setEditDetails] = useState({});

	const [allKeysSaved, setAllKeysSaved] = useState(true);

	const {
		loading,
		data,
		getTestQuestionTest,
	} = useGetTestQuestionTest({ setSavedQuestionDetails, setAllKeysSaved });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					style={{ cursor: 'pointer' }}
					width={20}
					height={20}
					onClick={() => router.push('/learning/faq/create/test-module')}
				/>

				<div className={styles.title}>New Question Set</div>
			</div>

			<BasicDetailsForm
				setQuestionSetId={setQuestionSetId}
				getTestQuestionTest={getTestQuestionTest}
				data={data}
				questionSetId={questionSetId}
				setEditDetails={setEditDetails}
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
				editDetails={editDetails}
				setEditDetails={setEditDetails}
			/>
		</div>
	);
}

export default CreateQuestionSet;
