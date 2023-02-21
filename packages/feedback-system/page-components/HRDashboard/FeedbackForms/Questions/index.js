import { Toast, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import CreateForm from '../../../../common/CreateForm';
import QuestionsItem from '../../../../common/QuestionsItem';
import useSaveFeedbackQuestions from '../../../../hooks/useSaveFeedbackQuestions';

import styles from './styles.module.css';

function Questions({
	questions = [], setRefetchList = () => {},
	questionActionList = [],
	setQuestionActionList = () => {},
	questionStatus = '',
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

	const totalQuestions = questions.length;

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
			{(questions || []).map((question, index) => {
				const { id = '' } = question || {};
				const isChecked = !isEmpty(questionActionList.checked?.find((que) => que.id === id));

				return (
					<QuestionsItem
						item={question}
						index={index}
						feedbackQuestionId={id}
						setQuestionActionList={setQuestionActionList}
						isChecked={isChecked}
						questionStatus={questionStatus}
						totalCount={totalQuestions}
						key={id}
					/>
				);
			})}

			{questionActionList.edit && renderEditModal()}
		</div>
	);
}

export default Questions;
