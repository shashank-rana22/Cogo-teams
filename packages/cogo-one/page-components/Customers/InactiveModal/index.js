import { Modal, Button, RadioGroup, DateRangepicker, Timepicker } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import React, {	useEffect } from 'react';

import styles from './styles.module.css';

function InactiveModal({
	toggleStatus,
	setToggleStatus,
	inactiveReasons,
	setInactiveReasons,
	setInactiveDate,
	inactiveDate,
	setInactiveTime,
	inactiveTime,
}) {
	const OPTIONS = [
		{
			label : 'On Break',
			value : 'on_break',
		},
		{
			label : 'On Lunch',
			value : 'on_lunch',
		},
		{
			label : 'On Leave',
			value : 'on_leave',
		},
	];

	const resetReasons = () => {
		setInactiveReasons('');
		setInactiveDate('');
		setInactiveTime('');
	};

	useEffect(() => {
		setInactiveDate('');
		setInactiveTime('');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inactiveReasons]);

	const handleClose = () => {
		setToggleStatus(false);
		setInactiveReasons('');
	};

	return (
		<div className={styles.container}>
			<Modal size="sm" show={toggleStatus} onClose={handleClose} placement="top">
				<Modal.Header title="Inactive Status" />
				<Modal.Body>
					<RadioGroup
						options={OPTIONS}
						value={inactiveReasons}
						onChange={setInactiveReasons}
						className={styles.group_radio}
					/>

					{inactiveReasons === 'on_leave' && (
						<div className={styles.date_range}>
							<DateRangepicker name="date" onChange={setInactiveDate} value={inactiveDate} />
						</div>
					)}

					{(inactiveReasons === 'on_break' || inactiveReasons === 'on_lunch') && (
						<div className={styles.date_range}>
							<Timepicker name="date" timeIntervals={5} onChange={setInactiveTime} value={inactiveTime} />
						</div>
					)}

				</Modal.Body>

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
					<Button size="md" themeType="accent">Apply</Button>
				</div>
			</Modal>
		</div>
	);
}

export default InactiveModal;
