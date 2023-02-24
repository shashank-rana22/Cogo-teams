import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function FeedbackModal({ feedback = '' }) {
	const [show, setShow] = useState(false);

	return (
		<>
			<div className={styles.feedback_button}>
				<Button
					size="sm"
					themeType="secondary"
					disabled={isEmpty(feedback)}
					onClick={() => setShow(true)}
				>
					View Feedback
				</Button>
			</div>

			{show && (
				<div className={styles.details_modal}>
					<Modal size="md" show={show} onClose={() => setShow(false)} onClickOutside={() => setShow(false)}>
						<Modal.Header title="View Feedback" />
						<Modal.Body>
							<div style={{ marginBottom: '14px', color: '#4f4f4f' }}>Feedback</div>
							<div>
								{feedback}
							</div>
						</Modal.Body>
					</Modal>
				</div>
			)}
		</>
	);
}

export default FeedbackModal;
