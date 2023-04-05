import { Button, Modal } from '@cogoport/components';

import handleEnterFullScreen from '../../../../utils/handleEnterFullScreen';

import styles from './styles.module.css';

const items = [
	`Opening test instructions during the test will lead to wastage of test time,
	 make sure you read instructions well before beginning the test.`,
	'Exam can be only taken in full screen',
	'To Start test, please click on Begin Test',
	`Changing tabs is not allowed in between exam, If
	 you switch tabs more than 2 times, your exam will be submitted automatically`,
	'To submit the test, please click on submit test button',
	'click on cancel if you dont want to start exam now',
	'The timer will start once you start the exam',
];

function InstructionsModal({ loading, guidelines, setShowInstructionsModal }) {
	const handleCloseInstruction = () => {
		handleEnterFullScreen();
		setShowInstructionsModal(false);
	};

	return (
		<Modal showCloseIcon={false} size="md" show className={styles.modal_container}>
			<Modal.Header title="Test Instructions" />

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
