import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useCreateDunningCycle from '../hooks/useCreateDunningCycle';

import ExcludeListView from './ExcludeListView';
import FormLayout from './FormLayout';
import MailView from './MailView';
import styles from './styles.module.css';

interface Props {
	showCreateForm?:boolean,
	setShowCreateForm?:Function,
	formData?:object,
	setFormData?:(p:object)=>void,
	getDunningList?:Function,
}

function CreateCycleForm({ showCreateForm, setShowCreateForm, getDunningList }:Props) {
	const DEFAULT_STEP = 1;
	const EXCLUDE_STEP = 2;
	const MAIL_STEP = 3;
	const STEP_CHANGE = 1;

	const [formData, setFormData] = useState({
		triggerType   : 'oneTime',
		frequency     : 'DAILY',
		severityLevel : '1',
		timezone      : 'IST',
	});

	const [step, setStep] = useState(DEFAULT_STEP);
	const [uncheckedRows, setUncheckedRows] = useState([]);

	const { createDunningCycle, loading } = useCreateDunningCycle({
		formData,
		uncheckedRows,
		setShowCreateForm,
		getDunningList,
	});

	const onClose = () => {
		setShowCreateForm(false);
	};

	const renderTitle = () => (
		<div className={styles.title}>
			Create New Cycle -
			{' '}
			<span className={styles.step}>
				Step
				{' '}
				{step}
				/3
			</span>
		</div>
	);

	const STEPS_MAPPING = {
		1: <FormLayout
			formData={formData}
			setFormData={setFormData}
		/>,
		2: <ExcludeListView
			uncheckedRows={uncheckedRows}
			setUncheckedRows={setUncheckedRows}
			formData={formData}
		/>,
		3: <MailView
			formData={formData}
			setFormData={setFormData}
		/>,
	};

	const handleClick = () => {
		setStep(step + STEP_CHANGE);
	};

	const submitData = () => {
		createDunningCycle();
	};

	return (
		<div>
			<Modal
				size="xl"
				show={showCreateForm}
				onClose={onClose}
				placement="center"
				className={styles.modal_body_wrapper}
			>
				<Modal.Header title={renderTitle()} />

				<Modal.Body>
					{STEPS_MAPPING[step]}
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.footer}>
						{step === EXCLUDE_STEP && uncheckedRows?.length > 0 && (
							<div>
								<div style={{ marginRight: '8px' }}>
									{uncheckedRows?.length}
									{' '}
									Customers unselected and to be removed from this cycle upon submission
								</div>
							</div>
						)}
						{step !== DEFAULT_STEP && (
							<Button
								onClick={() => setStep(step - STEP_CHANGE)}
								style={{ marginRight: '8px' }}
								themeType="secondary"
							>
								Back
							</Button>
						)}
						{step !== MAIL_STEP ? (
							<Button
								onClick={() => handleClick()}
							>
								Save and Next
							</Button>
						)
							: (
								<Button
									onClick={submitData}
									disabled={loading}
								>
									Save and Send
								</Button>
							)}

					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateCycleForm;
