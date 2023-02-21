import { Button } from '@cogoport/components';

import useCreateForm from '../../../../../hooks/useCreateForm';
import Questions from '../../Questions';

import styles from './styles.module.css';

function SubmitForm({
	questionActionList = {},
	setQuestionActionList = () => [],
	proceedForm = () => {},
	department,
	designation,
}) {
	const { onCreateForm, createFormLoading = false } = useCreateForm();

	const createForm = () => {
		const newQuestionFormat = questionActionList.weigh?.map((que, index) => {
			const { id: question_id = '', weightage = '' } = que;

			const weight = Number(weightage);

			return { question_id, weightage: weight, rank: index + 1 };
		});

		onCreateForm({
			form_questions: newQuestionFormat,
			department,
			designation,
			proceedForm,
		});
	};

	return (
		<div className={styles.submit_form_container}>
			<div className={styles.header}>Create Form</div>
			{questionActionList.weigh?.length > 0 && (
				<Questions
					questions={questionActionList.checked}
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
					onClick={() => createForm()}
					loading={createFormLoading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default SubmitForm;
