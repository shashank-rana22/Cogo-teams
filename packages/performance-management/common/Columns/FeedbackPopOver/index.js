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
					themeType="tertiary"
					disabled={isEmpty(feedback)}
					onClick={() => setShow(true)}
				>
					View Feedback
				</Button>
			</div>

			{show && (
				<div className={styles.details_modal}>
					<Modal size="md" show={show} onClose={() => setShow(false)} onClickOutside={() => setShow(false)}>
						<Modal.Header title="Feedback" />
						<Modal.Body style={{ border: 'none' }}>
							<div className={styles.feedback}>
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
