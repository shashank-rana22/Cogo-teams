import { Button } from '@cogoport/components';

import Questions from '../../Questions';

import styles from './styles.module.css';

function SubmitForm({
	questionActionList = {},
	setQuestionActionList = () => [],
	proceedForm = () => {},
}) {
	return (
		<div className={styles.submit_form_container}>
			<div className={styles.header}>Create Form</div>
			{questionActionList.weigh?.length > 0 && (
				<Questions
					questions={questionActionList.weigh}
					setQuestionActionList={setQuestionActionList}
					questionStatus="add_weightage"
				/>
			)}

			<div className={styles.button_container}>
				<Button
					themeType="tertiary"
					style={{ marginRight: '8px' }}
					onClick={() => proceedForm('add_questions')}
				>
					Back

				</Button>

				<Button
					themeType="accent"
					onClick={() => proceedForm('publish')}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default SubmitForm;
