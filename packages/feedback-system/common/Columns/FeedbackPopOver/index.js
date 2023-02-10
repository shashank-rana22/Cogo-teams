import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function FeedbackModal({ feedback = '' }) {
	const [show, setShow] = useState(false);

	const onOuterClick = () => {
		setShow(false);
	};

	return (
		<>
			<div className={styles.feedback_button}>
				<Button
					size="sm"
					themeType="secondary"
					disabled={isEmpty(feedback)}
					onClick={() => setShow(true)}
				>
					Feedback
				</Button>
			</div>

			<Modal
				show={show}
				onClose={() => setShow(false)}
				size="sm"
				onOuterClick={onOuterClick}
			>
				<div className={styles.feedback}>
					<Modal.Header title="Feedback" />

					<Modal.Body>
						<div className={styles.text_content}>
							<div className={styles.title}>{feedback}</div>
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
}

export default FeedbackModal;
