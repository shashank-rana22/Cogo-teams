import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import useCreateForm from '../../../../../hooks/useCreateForm';
import Questions from '../../Questions';

import styles from './styles.module.css';

function SubmitForm({
	questionActionList = {},
	setQuestionActionList = () => [],
	proceedForm = () => {},
	department,
	designation,
	setRefetchedLists,
}) {
	const { onCreateForm, createFormLoading = false } = useCreateForm();

	const createForm = () => {
		const newQuestionFormat = questionActionList.checked?.map((que, index) => {
			const { id: question_id = '', weightage = '' } = que;

			const weight = Number(weightage);

			return { question_id, weightage: weight, rank: index + 1 };
		});

		onCreateForm({
			form_questions: newQuestionFormat,
			department,
			designation,
			proceedForm,
			setRefetchedLists,
		});
	};

	return (
		<div className={styles.submit_form_container}>
			<div className={styles.header}>
				Create Form :
				{' '}
				<span>
					{startCase(department)}
					{' > '}
				</span>

				<span1>{startCase(designation)}</span1>
			</div>

			<Questions
				questions={questionActionList.checked}
				setQuestionActionList={setQuestionActionList}
				questionStatus="add_weightage"
			/>

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
