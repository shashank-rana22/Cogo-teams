import { Breadcrumb } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import CreateQuestion from '../../../../../commons/CreateQuestion';

import styles from './styles.module.css';

function ManualAddition({
	questionSetId,
	getTestQuestionTest,
	setSavedQuestionDetails,
	setAllKeysSaved,
	editDetails,
	setEditDetails,
	topic,
	savedQuestionDetails,
	test_questions,
}) {
	return (
		<div>
			<Breadcrumb className={styles.breadcrumb_container}>
				<Breadcrumb.Item
					label={`${isEmpty(editDetails) ? 'Add' : 'Edit'} Questions`}
					className={styles.breadcrumb_item}
				/>
				<Breadcrumb.Item style={{ color: '#ee3425' }} label="Manual Addition" />
			</Breadcrumb>

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
					index={test_questions.findIndex(
						(item1) => item1?.id === editDetails?.id,
					)}
					type="edit"
					questionSetId={questionSetId}
					getTestQuestionTest={getTestQuestionTest}
					setSavedQuestionDetails={setSavedQuestionDetails}
					setAllKeysSaved={setAllKeysSaved}
					setEditDetails={setEditDetails}
					topic={topic}
				/>
			) : null}
		</div>
	);
}

export default ManualAddition;
