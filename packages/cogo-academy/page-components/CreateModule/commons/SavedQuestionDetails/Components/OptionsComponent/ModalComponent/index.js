import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
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
	allKeysSaved,
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

	const { created_at, question_type = '', test_case_study_questions = [], question_text = '' } = item || {};

	return (
		<div>
			<Modal
				show={!isEmpty(questionDetails)}
				onClose={() => setQuestionDetails({})}
				placement="center"
				showCloseIcon={false}
				className={styles.modal_container}
				size={question_type === 'case_study' ? 'xl' : 'md'}
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
							<div className={styles.case_study_question}>
								{question_text}
							</div>
						) : null}

						{question_type === 'case_study' ? (
							test_case_study_questions.map((question, index) => (
								<SingleQuestion
									id={question?.id}
									data={question}
									primary_question_type={question_type}
									case_index={index}
									length={test_case_study_questions.length}
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
								<span>{format(created_at, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}</span>
								<span>{', '}</span>
								<span>{format(created_at, GLOBAL_CONSTANTS.formats.time['hh:mm aaa'])}</span>
							</div>

							{mode !== 'view' && allKeysSaved ? (
								<div className={styles.btn_container}>
									<Button
										type="button"
										themeType="secondary"
										className={styles.btn}
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
				loading={loading}
				caseStudyLoading={caseStudyLoading}
			/>
		</div>
	);
}

export default ModalComponent;
