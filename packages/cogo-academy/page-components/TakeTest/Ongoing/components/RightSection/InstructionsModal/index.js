import { Button, Modal } from '@cogoport/components';

// import handleEnterFullScreen from '../../../../utils/handleEnterFullScreen';
import Timer from '../../LeftSection/Header/Timer';

import styles from './styles.module.css';

const items = [
	'Please read all questions carefully and attempt the questions.',
	// `Changing tabs is not allowed in between exam, If
	// you switch tabs more than 2 times, your exam will be submitted automatically`,
	`You may attempt a question and proceed to the next question via the ‘NEXT’ button. Your response,
	if any will automatically save as you click the NEXT button. 
	Alternatively, if you are unsure of the answer, 
	you may ‘MARK FOR REVIEW’ and try reviewing the question later.`,
	`If you do not wish to answer a question you may directly proceed with ‘NEXT’.
	You can also ‘MARK FOR REVIEW’ in a case you think you want to attempt that question later.`,
	'You may come back to any question at a later time from the side panel (with question numbers) and view them.',
	`If a question has not been attempted, if will show under the ‘Not answered’ tag. 
	Answered question will take the ‘Answered tag’ while questions 
	that you have not seen even once will take the ‘Not Visited’ tag. 
	Marked for Review question will take the ‘Marked for Review’ tag.`,
	'You may come back and edit your response to a question at any given point.',
	`At the last question of the test, please click on ‘SAVE’ to save your response, 
	post which you may proceed to ‘FINISH TEST’ or go back to any of the questions you missed or want to review. 
	Please select ‘FINSIH TEST’ whenever you want to submit the test.`,
	`If you run out of time, all questions that have been answered (even if they fall in the ‘Marked for review’
	category will be automatically submitted as a response.`,
];

function InstructionsModal({
	loading,
	guidelines,
	setShowInstructionsModal,
	start_time,
	testData,
	setShowTimeOverModal,
}) {
	const { test_duration } = testData || {};

	const time = new Date(start_time).getTime();

	const handleCloseInstruction = () => {
		// handleEnterFullScreen();
		setShowInstructionsModal(false);
	};

	return (
		<Modal showCloseIcon={false} size="md" show className={styles.modal_container}>
			<Modal.Header title={(
				<div className={styles.flex_container}>
					<div>Test Instructions</div>
					<Timer
						test_start_time={time}
						duration={test_duration}
						setShowTimeOverModal={setShowTimeOverModal}
					/>
				</div>
			)}
			/>

			<Modal.Body>
				<div className={styles.modal_body}>
					The timer still on, no extra time will be given for reading the instructions during the test.
				</div>

				<ol className={styles.list}>
					{[...items, ...guidelines].map((item, index) => (
						<li key={item} className={`${styles.list} ${styles[`list_${index}`]}`}>
							{item}
						</li>
					))}
				</ol>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					onClick={handleCloseInstruction}
					loading={loading}
				>
					Close Instructions
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default InstructionsModal;
