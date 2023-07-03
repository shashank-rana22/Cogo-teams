import { Button, Modal, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateDunningCycle from '../hooks/useCreateDunningCycle';

import ExcludeListView from './ExcludeListView';
import FormLayout from './FormLayout';
import MailView from './MailView';
import styles from './styles.module.css';

interface Props {
	showCreateForm?: boolean;
	setShowCreateForm?: Function;
	getDunningList?: Function;
}

const DEFAULT_STEP = 1;
const EXCLUDE_STEP = 2;
const MAIL_STEP = 3;
const STEP_CHANGE = 1;
const FINAL_STEP = 3;
const DEFAULT_SEVERITY_LEVEL = '1';
const DEFAULT_PAGE_INDEX = 1;

function CreateCycleForm({ showCreateForm, setShowCreateForm, getDunningList }:Props) {
	const [formData, setFormData] = useState({
		frequency           : 'DAILY',
		severityLevel       : DEFAULT_SEVERITY_LEVEL,
		timezone            : 'IST',
		scheduledHour       : '00',
		scheduledMinute     : '00',
		ageingBucket        : 'ALL',
		pageIndex           : DEFAULT_PAGE_INDEX,
		cycleName           : null,
		cycleType           : null,
		cogoEntityId        : null,
		totalDueOutstanding : null,
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

	const {
		cycleName,
		cycleType, cogoEntityId,
		totalDueOutstanding,
	} = formData || {};

	const renderTitle = () => (
		<div className={styles.title}>
			Create New Cycle -
			{' '}
			<span className={styles.step}>
				Step
				{' '}
				{step}
				/
				{FINAL_STEP}
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
			setFormData={setFormData}
		/>,
		3: <MailView
			formData={formData}
			setFormData={setFormData}
		/>,
	};

	const handleClick = () => {
		if (step === DEFAULT_STEP) {
			// putting validations
			const requiredFields = [cycleName, cycleType,
				cogoEntityId, totalDueOutstanding];
			if (requiredFields.some((field) => isEmpty(field))) {
				Toast.error('Please fill all the details to proceed');
				return;
			}
		}
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
				closeOnOuterClick={false}
			>
				<Modal.Header title={renderTitle()} />

				<Modal.Body
					style={{ height: '500px' }}
				>
					{STEPS_MAPPING[step]}
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.footer}>
						{step === EXCLUDE_STEP && !isEmpty(uncheckedRows) && (
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
