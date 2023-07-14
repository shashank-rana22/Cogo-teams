import { Modal, Button } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

import Timeline from '../Timeline';

import CreateExpenseForm from './CreateExpenseForm';
import MailTemplate from './MailTemplate';
import styles from './styles.module.css';

interface Props {
	setShowModal:any,
	showModal?: boolean,
	createExpenseType?: string,
	getList?:(p:any)=>void,
	getRecurringList?:(p:any)=>void,
	setShowWarning?:(p:any)=>void,
}

function CreateExpenseModal({
	setShowModal,
	showModal = false,
	createExpenseType = '',
	getList = () => {},
	getRecurringList = () => {},
	setShowWarning = () => {},
}:Props) {
	const [mailModal, setMailModal] = useState(false);
	const [recurringData, setRecurringData] = useState({
		repeatEvery: 'week',
	});
	const [timeline, setTimeline] = useState(['Expense Details', 'Upload Invoice', 'Final Confirmation']);
	const [nonRecurringData, setNonRecurringData] = useState({});
	const [active, setActive] = useState('Expense Details');
	const [isFormValidated, setIsFormValidated] = useState(false);

	const handleClick = () => {
		const current = timeline.indexOf(active);
		if (current < timeline.length - 1) { setActive(timeline[current + 1]); }
	};
	const handleBack = () => {
		const current = timeline.indexOf(active);
		setActive(timeline[current - 1]);
	};

	let headerTitle:string;
	if (createExpenseType === 'recurring') {
		headerTitle = 'RECORD - Recurring';
	} else if (createExpenseType === 'nonRecurring') {
		headerTitle = ' - Non Recurring';
	}

	let mailData:object;

	if (createExpenseType === 'recurring') {
		mailData = recurringData;
	} else if (createExpenseType === 'nonRecurring') {
		mailData = nonRecurringData;
	}

	useEffect(() => {
		if (createExpenseType === 'recurring') {
			setTimeline(['Expense Details', 'Final Confirmation']);
		} else {
			setTimeline(['Expense Details', 'Upload Invoice', 'Final Confirmation']);
		}
	}, [createExpenseType]);

	return (
		<Modal
			size="xl"
			show={showModal}
			onClose={() => setShowWarning(true)}
			placement="center"
		>
			<Modal.Header title={`CREATE EXPENSE ${headerTitle}`} />
			<Modal.Body className={styles.modal_data}>
				{createExpenseType === 'nonRecurring' && (
					<div>
						<Timeline active={active} timeline={timeline} />
					</div>
				)}
				<div style={{ marginTop: '20px' }}>
					<CreateExpenseForm
						active={active}
						createExpenseType={createExpenseType}
						recurringData={recurringData}
						setRecurringData={setRecurringData}
						nonRecurringData={nonRecurringData}
						setNonRecurringData={setNonRecurringData}
						setIsFormValidated={setIsFormValidated}
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
							onClick={handleClick}
							disabled={!isFormValidated}
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
							mailData={mailData}
							setShowModal={setShowModal}
							getList={getList}
							getRecurringList={getRecurringList}
							createExpenseType={createExpenseType}
						/>
					</Modal.Body>
				</Modal>
			)}
		</Modal>
	);
}

export default CreateExpenseModal;
