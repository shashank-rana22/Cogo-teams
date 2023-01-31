import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import Timeline from '../Timeline';

import RecurringForm from './RecurringForm';

interface Props {
	setShowModal:React.useState<boolean>,
	showModal?: boolean,
	createExpenseType?: string

}

function CreateExpenseModal({
	setShowModal,
	showModal = false,
	createExpenseType = '',
}:Props) {
	const timeline = ['Expense Details', 'Upload Invoice', 'Final Confirmation'];
	const [active, setActive] = useState('Expense Details');

	const handleClick = () => {
		const current = timeline.indexOf(active);
		if (current < timeline.length - 1) { setActive(timeline[current + 1]); }
	};
	const handleBack = () => {
		const current = timeline.indexOf(active);
		setActive(timeline[current - 1]);
	};

	return (
		<Modal size="xl" show={showModal} onClose={() => setShowModal(false)} placement="top">
			<Modal.Header title={`CREATE EXPENSE - ${createExpenseType}`} />
			<Modal.Body>
				<div>
					<Timeline active={active} timeline={timeline} />
				</div>
				<div style={{ marginTop: '40px' }}>
					{createExpenseType === 'RECURRING' ? <RecurringForm /> : 'non recurring'}
				</div>

			</Modal.Body>
			<Modal.Footer>
				{timeline.indexOf(active) !== 0 && (
					<Button onClick={handleBack} style={{ marginRight: '10px' }} themeType="secondary">
						Back
					</Button>
				)}
				{timeline.indexOf(active) !== timeline.length - 1
					? <Button onClick={handleClick}>Save & Next</Button> : <Button>Request Email</Button>}
			</Modal.Footer>
		</Modal>
	);
}

export default CreateExpenseModal;
