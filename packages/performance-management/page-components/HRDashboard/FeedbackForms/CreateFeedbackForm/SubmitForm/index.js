import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import useCreateForm from '../../../../../hooks/useCreateForm';
import Questions from '../../Questions';

import styles from './styles.module.css';

function SubmitForm({
	questionActionList = {},
	setQuestionActionList = () => [],
	proceedForm = () => {},
	formsParams = {},
	setRefetchedLists,
}) {
	const { department = '', designation = '', bulkDesignations = [] } = formsParams;

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
			bulkDesignations,
			proceedForm,
			setRefetchedLists,
		});
	};

	let isFormSubmittable = true;

	questionActionList.checked.forEach((que) => {
		if (que.weightage <= 0 && isFormSubmittable) {
			isFormSubmittable = false;
		}
	});

	return (
		<div className={styles.submit_form_container}>
			<div className={styles.header}>
				Create Form :
				{' '}
				<span>
					{startCase(department)}
					{' > '}
				</span>

				<span className={styles.role}>{startCase(designation)}</span>
			</div>

			<div className={styles.question_container}>
				<Questions
					questions={questionActionList.checked}
					setQuestionActionList={setQuestionActionList}
					questionStatus="add_weightage"
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="tertiary"
					style={{ marginRight: '8px' }}
					onClick={() => proceedForm('add_questions')}
				>
					Back

				</Button>

				<Button
					themeType="primary"
					onClick={() => createForm()}
					loading={createFormLoading}
					disabled={!isFormSubmittable}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default SubmitForm;
