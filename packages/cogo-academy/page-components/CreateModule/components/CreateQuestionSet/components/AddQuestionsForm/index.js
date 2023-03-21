import { ButtonIcon, Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

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
	editDetails,
	setEditDetails,
	from,
	setFilters,
	filters,
}) {
	const { test_questions = [], topic = '' } = data || {};

	if (isEmpty(questionSetId) && from !== 'test') {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.label}>Questions</div>

			{!isEmpty((test_questions || []).filter((item) => item.id !== editDetails?.id)) ? (
				<div className={styles.input_container}>
					<Input
						size="md"
						suffix={(
							<ButtonIcon
								size="md"
								icon={<IcMSearchlight />}
								disabled={false}
								themeType="primary"
							/>
						)}
						placeholder="Search for Question/topic"
						onChange={(val) => setFilters((prev) => ({ ...prev, q: val }))}
						value={filters?.q}
					/>
				</div>
			) : null}

			{loading ? (
				<LoadingState />
			) : (
				!isEmpty((test_questions || []).filter((item) => item.id !== editDetails?.id)) && (
					<SavedQuestionDetails
						savedQuestionDetails={savedQuestionDetails}
						test_questions={test_questions}
						editDetails={editDetails}
						setEditDetails={setEditDetails}
						allKeysSaved={allKeysSaved}
						setAllKeysSaved={setAllKeysSaved}
						questionSetId={questionSetId}
						getTestQuestionTest={getTestQuestionTest}
					/>
				)
			)}

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
							topic={topic}
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
					topic={topic}
				/>
			) : null}

			{from !== 'test' ? (
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
			) : null}
		</div>
	);
}

export default AddQuestionsForm;
