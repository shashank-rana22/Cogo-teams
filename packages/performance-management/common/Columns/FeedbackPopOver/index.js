import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function FeedbackModal({ feedback = '' }) {
	const [show, setShow] = useState(false);

	return (
		<>
			<Button
				size="sm"
				themeType="secondary"
				disabled={isEmpty(feedback)}
				onClick={() => setShow(true)}
			>
				View Feedback
			</Button>

			{show && (
				<Modal size="md" show={show} onClose={() => setShow(false)} onClickOutside={() => setShow(false)}>
					<Modal.Header title="Feedback" />
					<Modal.Body>
						<div className={styles.feedback}>
							{feedback}
						</div>
					</Modal.Body>
				</Modal>
			)}
		</>
	);
}

export default FeedbackModal;
