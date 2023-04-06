import { Breadcrumb } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import CreateQuestion from '../../../../../commons/CreateQuestion';

import styles from './styles.module.css';

function ManualAddition({
	questionSetId,
	setSavedQuestionDetails,
	setAllKeysSaved,
	editDetails,
	setEditDetails,
	topic,
	savedQuestionDetails,
	test_questions,
	listSetQuestions,
	mode,
	getTestQuestionTest,
}) {
	return (
		<div>
			<Breadcrumb className={styles.breadcrumb_container}>
				<Breadcrumb.Item
					label={mode === 'view' ? 'View Question' : `${isEmpty(editDetails) ? 'Add' : 'Edit'} Questions`}
					className={styles.breadcrumb_item}
				/>
				<Breadcrumb.Item
					style={{ color: '#221F20' }}
					className={styles.breadcrumb_item}
					label="Manual Addition"
				/>
			</Breadcrumb>

			{(savedQuestionDetails || []).map((item, index) => {
				const { isNew } = item;

				if (isNew) {
					return (
						<CreateQuestion
							key={item.id}
							index={index}
							item={item}
							questionSetId={questionSetId}
							listSetQuestions={listSetQuestions}
							setSavedQuestionDetails={setSavedQuestionDetails}
							setAllKeysSaved={setAllKeysSaved}
							editDetails={editDetails}
							setEditDetails={setEditDetails}
							topic={topic}
							mode={mode}
							getTestQuestionTest={getTestQuestionTest}
						/>
					);
				}

				return null;
			})}

			{!isEmpty(editDetails) ? (
				<CreateQuestion
					editDetails={editDetails}
					index={test_questions.findIndex(
						(item1) => item1?.id === editDetails?.id,
					)}
					type="edit"
					questionSetId={questionSetId}
					listSetQuestions={listSetQuestions}
					setSavedQuestionDetails={setSavedQuestionDetails}
					setAllKeysSaved={setAllKeysSaved}
					setEditDetails={setEditDetails}
					topic={topic}
					mode={mode}
					getTestQuestionTest={getTestQuestionTest}
				/>
			) : null}
		</div>
	);
}

export default ManualAddition;
