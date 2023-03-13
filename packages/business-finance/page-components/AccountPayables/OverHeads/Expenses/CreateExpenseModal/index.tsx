import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useListVendors from '../hooks/useListVendors';
import Timeline from '../Timeline';

import CreateExpenseForm from './CreateExpenseForm';
import MailTemplate from './MailTemplate';
import styles from './styles.module.css';

interface Props {
	setShowModal:any,
	showModal?: boolean,
	createExpenseType?: string

}

function CreateExpenseModal({
	setShowModal,
	showModal = false,
	createExpenseType = '',
}:Props) {
	const [mailModal, setMailModal] = useState(false);
	const [recurringData, setRecurringData] = useState({
		repeatEvery: 'week',
	});

	const [nonRecurringData, setNonRecurringData] = useState({
	});
	const timeline = ['Expense Details', 'Upload Invoice', 'Final Confirmation'];
	const [active, setActive] = useState('Expense Details');

	const { listVendorApi, loading } = useListVendors();

	const handleClick = () => {
		if (active === 'Expense Details' && createExpenseType !== 'recurring') {
			listVendorApi({ checkCombination: true, nonRecurringData, timeline, active, setActive });
		} else {
			const current = timeline.indexOf(active);
			if (current < timeline.length - 1) { setActive(timeline[current + 1]); }
		}
	};
	const handleBack = () => {
		const current = timeline.indexOf(active);
		setActive(timeline[current - 1]);
	};

	const headerTitle = createExpenseType === 'recurring' ? 'Recurring' : 'Non Recurring';

	return (
		<Modal size="fullscreen" show={showModal} onClose={() => setShowModal(false)} placement="center">
			<Modal.Header title={`CREATE EXPENSE - ${headerTitle}`} />
			<Modal.Body className={styles.modal_data}>
				<div>
					<Timeline active={active} timeline={timeline} />
				</div>
				<div style={{ marginTop: '20px' }}>
					<CreateExpenseForm
						active={active}
						createExpenseType={createExpenseType}
						recurringData={recurringData}
						setRecurringData={setRecurringData}
						nonRecurringData={nonRecurringData}
						setNonRecurringData={setNonRecurringData}
					/>
				</div>

			</Modal.Body>
			<Modal.Footer>
				{timeline.indexOf(active) !== 0 && (
					<Button onClick={handleBack} style={{ marginRight: '10px' }} themeType="secondary">
						Back
					</Button>
				)}
				{timeline.indexOf(active) !== timeline.length - 1
					? (
						<Button
							loading={loading}
							onClick={handleClick}
						>
							Save & Next
						</Button>
					) : <Button onClick={() => setMailModal(true)}>Request Email</Button>}
			</Modal.Footer>

			{mailModal 	&& (
				<Modal size="lg" show={mailModal} onClose={() => setMailModal(false)} placement="top">
					<Modal.Header title="Request Email Preview" />
					<Modal.Body className={styles.modal_body}>
						<MailTemplate
							nonRecurringData={nonRecurringData}
							setNonRecurringData={setNonRecurringData}
						/>
					</Modal.Body>
				</Modal>
			)}
		</Modal>
	);
}

export default CreateExpenseModal;
