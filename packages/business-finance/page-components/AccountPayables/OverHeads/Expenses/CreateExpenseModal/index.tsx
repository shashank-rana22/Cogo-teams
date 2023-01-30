import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import Timeline from '../Timeline';

import RecurringForm from './RecurringForm';

function CreateExpenseModal({
	setShowModal,
	showModal = false,
	createExpenseType = '',
}) {
	const timeline = ['expenseDetails', 'uploadInvoice', 'finalConfirmation'];
	const [active, setActive] = useState('expenseDetails');

	const handleClick = () => {
		const current = timeline.indexOf(active);
		setActive(timeline[current + 1]);
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
				{active !== 'expenseDetails' && (
					<Button onClick={handleBack} style={{ marginRight: '10px' }} themeType="secondary">
						Back
					</Button>
				)}
				{active !== 'finalConfirmation' && <Button onClick={handleClick}>Save & Next</Button>}
				{active === 'finalConfirmation' && <Button>Request Email</Button>}
			</Modal.Footer>
		</Modal>
	);
}

export default CreateExpenseModal;
