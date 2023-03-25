import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetTestQuestionTest from '../../hooks/useGetTestQuestionTest';
import useListSetQuestions from '../../hooks/useListSetQuestions';

import AddQuestionsForm from './components/AddQuestionsForm';
import BasicDetailsForm from './components/BasicDetailsForm';
import styles from './styles.module.css';

function CreateQuestionSet() {
	const router = useRouter();
	const { query, debounceQuery } = useDebounceQuery();

	const [savedQuestionDetails, setSavedQuestionDetails] = useState([]);
	const [editDetails, setEditDetails] = useState({});

	const [allKeysSaved, setAllKeysSaved] = useState(true);

	const {
		loading,
		data,
		getTestQuestionTest,
		questionSetId,
		setQuestionSetId,
		setFilters,
		filters,
	} = useGetTestQuestionTest({ setSavedQuestionDetails, setAllKeysSaved, setEditDetails });

	const {
		loading:listLoading,
		listSetQuestions,
		listData,
		total_count,
		page,
		setPage,
	} = useListSetQuestions({ questionSetId, setSavedQuestionDetails, setAllKeysSaved, setEditDetails, query });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					style={{ cursor: 'pointer' }}
					width={20}
					height={20}
					onClick={() => router.push('/learning?activeTab=test_module')}
				/>

				<div className={styles.title}>New Question Set</div>
			</div>

			<BasicDetailsForm
				setQuestionSetId={setQuestionSetId}
				getTestQuestionTest={getTestQuestionTest}
				data={data}
				questionSetId={questionSetId}
				setEditDetails={setEditDetails}
				loading={loading}
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
				setFilters={setFilters}
				filters={filters}
				debounceQuery={debounceQuery}
				listData={listData}
				listLoading={listLoading}
				listSetQuestions={listSetQuestions}
				total_count={total_count}
				page={page}
				setPage={setPage}
			/>
		</div>
	);
}

export default CreateQuestionSet;
