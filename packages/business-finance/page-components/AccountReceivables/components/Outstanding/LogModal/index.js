import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import ActivityLog from '../ActivityLog';

function LogModal({ showLog = false, setShowLog = () => {} }) {
	const [formData, setFormData] = useState({});
	const [feedback, setFeedback] = useState({});

	const title = formData?.reminder ? 'Add Reminder' : 'Add Activity Log';

	const handleClose = () => {
		setShowLog(false);
		setFormData({});
		setFeedback({});
	};

	const handleSubmit = () => {
		setShowLog(false);
		setFormData({});
		setFeedback({});
	};

	return (
		<Modal size="lg" show={showLog} onClose={handleClose} placement="center">
			<Modal.Header title={title} />
			<Modal.Body>
				<ActivityLog
					formData={formData}
					setFormData={setFormData}
					feedback={feedback}
					setFeedback={setFeedback}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit}>Add Activity Log</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LogModal;
