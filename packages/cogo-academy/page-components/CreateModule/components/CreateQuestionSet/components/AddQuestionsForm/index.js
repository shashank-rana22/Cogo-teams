import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import CreateQuestion from '../../../../commons/CreateQuestion';
import LoadingState from '../../../../commons/LoadingState';
import SavedQuestionDetails from '../../../../commons/SavedQuestionDetails';
import useGetTestQuestionTest from '../../../../hooks/useGetTestQuestionTest';

import styles from './styles.module.css';

function AddQuestionsForm({ questionSetId }) {
	const [savedQuestionDetails, setSavedQuestionDetails] = useState([]);

	const [allKeysSaved, setAllKeysSaved] = useState(true);

	const {
		loading,
		data,
		getTestQuestionTest,
	} = useGetTestQuestionTest({ setSavedQuestionDetails, setAllKeysSaved });

	const { question_count, test_questions } = data || {};

	useEffect(() => {
		if (!isEmpty(questionSetId)) {
			getTestQuestionTest({ questionSetId });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionSetId]);

	if (isEmpty(questionSetId)) {
		return null;
	}

	if (loading) {
		return <LoadingState />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.label}>Questions</div>

			{question_count ? (
				<SavedQuestionDetails
					savedQuestionDetails={savedQuestionDetails}
					test_questions={test_questions}
				/>
			) : null}

			{(savedQuestionDetails || []).map((item, index) => {
				const { isNew } = item;

				if (isNew) {
					return (
						<CreateQuestion
							index={index}
							item={item}
							questionSetId={questionSetId}
							getTestQuestionTest={getTestQuestionTest}
							setSavedQuestionDetails={setSavedQuestionDetails}
							setAllKeysSaved={setAllKeysSaved}
						/>
					);
				}

				return null;
			})}

			<div className={styles.button_container}>
				<Button
					type="button"
					disabled={!allKeysSaved}
					themeType="secondary"
					onClick={() => {
						setSavedQuestionDetails((prev) => [...prev, { id: new Date().getTime(), isNew: true }]);
						setAllKeysSaved(false);
					}}
				>
					+ Add Another Question
				</Button>
			</div>
		</div>
	);
}

export default AddQuestionsForm;
