import CreateForm from '../../../../../../common/CreateForm';
import useAddFeedbackQuestion from '../../../../../../hooks/useAddFeedbackQuestion';

import styles from './styles.module.css';

function CreateQuestions({
	setOpenNewQuestionModal = () => {}, setRefetchList = () => {},
	addAnother = false, setAddAnother = () => {},
}) {
	const { formProps, onAddFeedbackQuestion, controls } = useAddFeedbackQuestion({});
	const { reset } = formProps;

	const createNewQuestion = (values) => {
		onAddFeedbackQuestion({ values, setRefetchList, reset, setAddAnother });
	};

	return (
		<div className={styles.modal_content_container}>
			<div className={styles.header}>Please add your question and describe it briefly...</div>
			<CreateForm
				controls={controls}
				formProps={formProps}
				type={addAnother ? 'add_another' : 'create_question'}
				onSubmit={createNewQuestion}
				onCancel={() => {
					setAddAnother(false);
					setOpenNewQuestionModal(false);
				}}
			/>
		</div>
	);
}

export default CreateQuestions;
