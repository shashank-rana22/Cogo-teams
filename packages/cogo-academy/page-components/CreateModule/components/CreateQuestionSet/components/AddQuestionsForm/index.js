import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CreateQuestion from '../../../../commons/CreateQuestion';
import LoadingState from '../../../../commons/LoadingState';
import SavedQuestionDetails from '../../../../commons/SavedQuestionDetails';

import styles from './styles.module.css';

function AddQuestionsForm({
	questionSetId,
	savedQuestionDetails,
	allKeysSaved,
	data,
	loading,
	getTestQuestionTest,
	setSavedQuestionDetails,
	setAllKeysSaved,
}) {
	const [editDetails, setEditDetails] = useState({});

	const { test_questions } = data || {};

	if (isEmpty(questionSetId)) {
		return null;
	}

	if (loading) {
		return <LoadingState />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.label}>Questions</div>

			{test_questions.filter((item) => item.id !== editDetails?.id).length > 0 ? (
				<SavedQuestionDetails
					savedQuestionDetails={savedQuestionDetails}
					test_questions={test_questions}
					editDetails={editDetails}
					setEditDetails={setEditDetails}
					allKeysSaved={allKeysSaved}
					setAllKeysSaved={setAllKeysSaved}
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
							editDetails={editDetails}
							setEditDetails={setEditDetails}
						/>
					);
				}

				return null;
			})}

			{!isEmpty(editDetails) ? (
				<CreateQuestion
					editDetails={editDetails}
					index={test_questions.findIndex((item1) => item1?.id === editDetails?.id)}
					type="edit"
					questionSetId={questionSetId}
					getTestQuestionTest={getTestQuestionTest}
					setSavedQuestionDetails={setSavedQuestionDetails}
					setAllKeysSaved={setAllKeysSaved}
					setEditDetails={setEditDetails}
				/>
			) : null}

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
