import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CreateQuestion from '../../../../commons/CreateQuestion';
import SavedQuestionDetails from '../../../../commons/SavedQuestionDetails';

import styles from './styles.module.css';

function AddQuestionsForm({ questionSetId }) {
	const [savedQuestionDetails, setSavedQuestionDetails] = useState([{ id: new Date().getTime(), isNew: true }]);

	const [formToShow, setFormToShow] = useState(savedQuestionDetails[0].id);

	console.log(setFormToShow, setSavedQuestionDetails);

	if (!isEmpty(questionSetId)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.label}>Questions</div>

			{savedQuestionDetails.map((item, index) => {
				const { id } = item;

				if (id === formToShow) {
					return <CreateQuestion index={index} item={item} questionSetId={questionSetId} />;
				}

				return <SavedQuestionDetails index={index} item={item} />;
			})}

			<div className={styles.button_container}>
				<Button
					type="button"
					disabled={!isEmpty(formToShow)}
					themeType="secondary"
				>
					+ Add Another Question
				</Button>
			</div>
		</div>
	);
}

export default AddQuestionsForm;
