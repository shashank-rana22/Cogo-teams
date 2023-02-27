import { Modal, Button, Select, Datepicker, Timepicker } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty, addHours, format } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { OFFLINE_STATUS_OPTIONS } from '../../../../constants';
import getWeekDates from '../../../../utils/getWeekDates';

import styles from './styles.module.css';

function InactiveModal({
	updateUserStatus,
	setOpenModal,
	loading,

}) {
	const [offlineStatus, setOfflineStatus] = useState('');
	const [date, setDate] = useState(new Date());
	const [ofTime, setOfTime] = useState(new Date());

	const customEndTime = date.setHours(
		ofTime.getHours(),
		ofTime.getMinutes(),
		ofTime.getSeconds(),
	);

	const resetReasons = () => {
		setOfflineStatus('');
		setDate(new Date());
		setOfTime(new Date());
	};

	const handleClose = () => {
		setOpenModal(false);
	};

	useEffect(() => {
		setDate(new Date());
		setOfTime(new Date());
	}, [offlineStatus]);

	const emptyStateCheck = isEmpty(offlineStatus);
	const customEmptyCheck = date === '';

	const checks = offlineStatus !== 'custom' ? emptyStateCheck : customEmptyCheck;

	const createSubmit = () => {
		let validity_start = '';
		let validity_end = '';

		if (offlineStatus === '1_hour') {
			validity_start = new Date();
			validity_end = addHours(new Date(), 1);
		} else if (offlineStatus === '4_hour') {
			validity_start = new Date();
			validity_end = addHours(new Date(), 4);
		} else if (offlineStatus === 'today') {
			validity_start = new Date((new Date()).setHours(0, 0, 0, 0));
			validity_end = new Date((new Date()).setHours(23, 59, 59, 999));
		} else if (offlineStatus === 'this_week') {
			const {
				startDate,
				endDate,
			} = getWeekDates();
			validity_start = startDate;
			validity_end = endDate;
		} else {
			validity_start = new Date();
			validity_end = customEndTime;
		}

		const data = {
			status         : 'break',
			validity_start : format(
				validity_start,
				'yyyy-MM-dd HH:mm:ss',
			),
			validity_end: format(
				validity_end,
				'yyyy-MM-dd HH:mm:ss',
			),
		};

		updateUserStatus(data);
	};

	return (
		<Modal size="sm" show onClose={handleClose} placement="top">
			<Modal.Header title="Offline Status" />

			<div className={styles.duration_div}>
				<div className={styles.time_title}>
					Set offline status till
				</div>

				<Select
					value={offlineStatus}
					onChange={setOfflineStatus}
					placeholder="Select here..."
					options={OFFLINE_STATUS_OPTIONS}
				/>
				{offlineStatus === 'custom' && (
					<>
						<div className={styles.time_title}>
							Date
						</div>
						<Datepicker
							placeholder="Select date"
							dateFormat="MM/dd/yyyy HH:mm"
							name="date"
							onChange={setDate}
							value={date}
						/>

						<div className={styles.time_title}>
							Time
						</div>

						<Timepicker
							onChange={setOfTime}
							value={ofTime}
						/>
					</>
				)}

				<div className={styles.actions}>
					<Button
						size="md"
						themeType="tertiary"
						onClick={resetReasons}
					>
						<div className={styles.refresh_icon}>
							<IcMRefresh width={16} height={16} />
						</div>
						Reset Status
					</Button>
					<Button
						loading={loading}
						disabled={checks}
						size="md"
						themeType="accent"
						onClick={createSubmit}
						className={styles.last_button}
					>
						Apply

					</Button>
				</div>
			</div>

		</Modal>

	);
}

export default InactiveModal;
