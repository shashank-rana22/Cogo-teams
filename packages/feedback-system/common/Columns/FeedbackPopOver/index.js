import { Modal } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function FeedbackModal({ feedback = '' }) {
	const [show, setShow] = useState(false);
	const content = () => (
		<div className={styles.feedback}>
			<p>Feedback</p>

			<div className={styles.text_content}>
				<div className={styles.title}>{feedback}</div>
			</div>
		</div>
	);

	const onOuterClick = () => {
		setShow(false);
	};

	return (
		<>
			<div className={styles.feedback_button} role="button" tabIndex={0} onClick={() => setShow(true)}>
				<p className={styles.styled_text}>Feedback </p>
			</div>

			<Modal
				show={show}
				onClose={() => setShow(false)}
				className="primary sm"
				onOuterClick={onOuterClick}
			>
				{content()}
			</Modal>
		</>
	);
}

export default FeedbackModal;
