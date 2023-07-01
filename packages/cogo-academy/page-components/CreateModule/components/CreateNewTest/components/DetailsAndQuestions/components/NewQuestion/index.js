import { Breadcrumb } from '@cogoport/components';
import { useState } from 'react';

import AddQuestionsForm from '../../../../../CreateQuestionSet/components/AddQuestionsForm';

import styles from './styles.module.css';

function NewQuestion({ setAllKeysSaved, allKeysSaved }) {
	const [savedQuestionDetails, setSavedQuestionDetails] = useState([{ id: new Date().getTime(), isNew: true }]);

	return (
		<div>
			<Breadcrumb>
				<Breadcrumb.Item
					onClick={() => setAllKeysSaved(true)}
					label="Add Questions to test"
					className={styles.breadcrumb_item}
				/>
				<Breadcrumb.Item label="New Questions" />
			</Breadcrumb>

			<AddQuestionsForm
				savedQuestionDetails={savedQuestionDetails}
				allKeysSaved={allKeysSaved}
				setAllKeysSaved={setAllKeysSaved}
				loading={false}
				from="test"
				questionSetId="06ab4075-09d8-4e24-8b93-d19a8b8088ec"
				setSavedQuestionDetails={setSavedQuestionDetails}
			/>
		</div>
	);
}

export default NewQuestion;
