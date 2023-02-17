import { Modal, Button, Datepicker, RadioGroup } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateUserInactiveStatus from '../../../hooks/useCreateUserInactiveStatus';

import styles from './styles.module.css';

function InactiveModal({
	toggleStatus,
	setToggleStatus,
	workPrefernce,
}) {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [inactiveReason, setInactiveReason] = useState('');

	const {
		loading,
		userStatus = () => {},
	} = useCreateUserInactiveStatus({ workPrefernce });

	const REASONS = [
		{
			label : 'On Break',
			value : 'break',
		},
	];

	const resetReasons = () => {
		setInactiveReason('');
		setStartDate('');
		setEndDate('');
	};

	const handleClose = () => {
		setToggleStatus(false);
		setStartDate('');
		setEndDate('');
	};

	const handleSubmit = () => {
		userStatus({ inactiveReason, endDate, startDate });
	};

	const emptyStateCheck = isEmpty(inactiveReason);

	return (
		<div className={styles.container}>
			<Modal size="sm" show={toggleStatus} onClose={handleClose} placement="top">
				<Modal.Header title="Inactive Status till" />

				<RadioGroup options={REASONS} onChange={setInactiveReason} value={inactiveReason} />

				{!isEmpty(inactiveReason) && (
					<div className={styles.time_container}>
						<div className={styles.start_time}>
							<div className={styles.time_title}>Start Date and Time</div>
							<div className={styles.wrap_start}>
								<Datepicker
									placeholder="Enter Date"
									showTimeSelect
									dateFormat="MM/dd/yyyy HH:mm"
									name="date"
									onChange={setStartDate}
									value={startDate}
								/>
							</div>
						</div>

						<div className={styles.end_time}>
							<div className={styles.time_title}>End Date and Time</div>
							<div className={styles.wrap_end}>
								<Datepicker
									placeholder="Enter Date"
									showTimeSelect
									dateFormat="MM/dd/yyyy HH:mm"
									name="date"
									onChange={setEndDate}
									value={endDate}
								/>
							</div>
						</div>
					</div>
				)}

				<div className={styles.actions}>
					<Button
						size="md"
						themeType="tertiary"
						onClick={resetReasons}
						className={styles.refresh_action}
					>
						<div className={styles.refresh_icon}>
							<IcMRefresh width={16} height={16} />
						</div>
						Reset Status
					</Button>
					<Button
						loading={loading}
						disabled={emptyStateCheck}
						size="md"
						themeType="accent"
						onClick={() => handleSubmit()}
					>
						Apply

					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default InactiveModal;
