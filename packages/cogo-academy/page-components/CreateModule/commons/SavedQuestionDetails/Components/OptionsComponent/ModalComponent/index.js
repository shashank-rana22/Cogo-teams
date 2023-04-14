import { Modal, Button } from '@cogoport/components';
import { IcMCross, IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { format, isEmpty } from '@cogoport/utils';

import useSavedQuestionDetails from '../../../useSavedQuestionDetails';
import DeleteModal from '../../DeleteModal';

import SingleQuestion from './SingleQuestion';
import styles from './styles.module.css';

function ModalComponent({
	item,
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	setEditDetails,
	mode,
	listSetQuestions,
	editDetails,
	questionDetails,
	setQuestionDetails,
	allKeysSaved
}) {
	const {
		handleEditQuestion,
		handleDeleteQuestion,
		loading,
		questionToDelete,
		setQuestionToDelete,
		caseStudyLoading,
	} = useSavedQuestionDetails({
		setAllKeysSaved,
		getTestQuestionTest,
		listSetQuestions,
		questionSetId,
		setEditDetails,
		editDetails,
		setQuestionDetails,
	});

	const { created_at, question_type = '', test_case_study_questions = [] } = item || {};

	console.log('allKeysSaved',allKeysSaved);
	
	return (
		<div>
			<Modal
				show={!isEmpty(questionDetails)}
				onClose={() => setQuestionDetails({})}
				placement="center"
				showCloseIcon={false}
				className={styles.modal_container}
				size="md"
			>
				<Modal.Body>
					<div className={styles.container}>
						<IcMCross
							width={18}
							height={18}
							onClick={() => setQuestionDetails({})}
							className={styles.close_icon}
						/>

						{question_type === 'case_study' ? (
							test_case_study_questions.map((question) => (
								<SingleQuestion
									id={question?.id}
									data={question}
									primary_question_type={question_type}
								/>
							))
						) : (
							<SingleQuestion
								data={item}
								primary_question_type={question_type}
							/>
						)}

						<div className={styles.footer}>
							<div className={styles.created_at}>
								{format(created_at, 'dd MMM yyyy hh:mm a')}
							</div>

							{mode !== 'view' && allKeysSaved ? (
								<div className={styles.btn_container}>
									<Button
										type="button"
										themeType="secondary"
										className={styles.btn}
										loading={loading || caseStudyLoading}
										onClick={() => {
											setQuestionToDelete(item);
										}}
									>
										<IcMDelete />
										<div style={{ marginLeft: '8px' }}>
											Delete
										</div>
									</Button>

									<Button
										type="button"
										onClick={() => handleEditQuestion({ item })}
										themeType="accent"
										disabled={loading || caseStudyLoading}
										style={{ marginLeft: '16px' }}
									>
										<IcMEdit />
										<div
											style={{ marginLeft: '8px' }}
										>
											Edit
										</div>
									</Button>
								</div>
							) : null}
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<DeleteModal
				questionToDelete={questionToDelete}
				setQuestionToDelete={setQuestionToDelete}
				handleDeleteQuestion={handleDeleteQuestion}
			/>
		</div>
	);
}

export default ModalComponent;
