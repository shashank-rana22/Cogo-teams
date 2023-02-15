import { Toast, Modal } from '@cogoport/components';

import CreateForm from '../../../../common/CreateForm';
import QuestionsItem from '../../../../common/QuestionsItem';
import useSaveFeedbackQuestions from '../../../../hooks/useSaveFeedbackQuestions';

import styles from './styles.module.css';

function Questions({
	questions = [], setRefetchList = () => {},
	questionActionList = [],
	setQuestionActionList = () => {},
}) {
	const {
		formProps = {}, onSaveFeedbackQuestions, loading: saveLoading = false,
		controls,
	} = useSaveFeedbackQuestions();

	const { setValue, getValues, reset } = formProps;

	const SaveQuestions = () => {
		const newQuestion = getValues();

		const finalQuestion = {
			...newQuestion,
			weight: Number(newQuestion?.weight),
		};

		const { weight } = newQuestion || {};

		if (weight < 0 || weight > 100) {
			Toast.error('Enter Weightage between 1 to 100 ');
			return;
		}

		onSaveFeedbackQuestions({
			questions            : finalQuestion,
			feedback_question_id : questionActionList.edit,
			setQuestionActionList,
			setRefetchList,
			reset,
		});
	};

	const setEditFormValue = (questionData = {}) => {
		controls.forEach((control) => {
			const { name: controlName } = control;
			setValue(controlName, questionData[controlName]);
		});
	};

	const onCancelEdit = () => {
		setQuestionActionList((pv) => ({ ...pv, edit: undefined }));
		reset();
	};

	const renderEditModal = () => {
		const fill_question = questions.find((edit_question) => edit_question.id
		=== questionActionList.edit);

		setEditFormValue(fill_question);

		return (
			<Modal
				show
				onClose={onCancelEdit}
			>
				<Modal.Header title="Edit Question" />

				<div className={styles.modal_body}>
					<Modal.Body>
						<div className={styles.modal_content_container}>
							<div className={styles.header}>
								Please edit your question and describe it briefly...
							</div>
							<CreateForm
								controls={controls}
								formProps={formProps}
								type="edit_question"
								onSubmit={SaveQuestions}
								onCancel={onCancelEdit}
							/>
						</div>
					</Modal.Body>
				</div>
			</Modal>
		);
	};

	return (
		<div className={styles.list_container}>
			{(questions || []).map((question) => {
				const { id = '' } = question || {};

				return (
					<QuestionsItem
						item={question}
						feedbackQuestionId={id}
						setQuestionActionList={setQuestionActionList}
						isChecked={questionActionList.checked?.includes(question)}
					/>
				);
			})}

			{questionActionList.edit && renderEditModal()}
		</div>
	);
}

export default Questions;
