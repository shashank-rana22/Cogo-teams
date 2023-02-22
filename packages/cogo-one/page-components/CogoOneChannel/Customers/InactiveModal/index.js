import { Modal, Button, Select, Datepicker } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty, addHours, format } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { OFFLINE_STATUS_OPTIONS } from '../../../../constants';

import styles from './styles.module.css';

function InactiveModal({
	updateUserStatus,
	setOpenModal,
	loading,

}) {
	const [offlineStatus, setOfflineStatus] = useState('');
	const [date, setDate] = useState('');
	// const [ofTime, setOfTime] = useState(new Date().getTime());
	// console.log('ofTime:', ofTime);
	// const customEndTime = 'fghjk';
	// const customEndTime = date.setHours(
	// 	// ofTime.getHours(),
	// 	// ofTime.getMinutes(),
	// 	// ofTime.getSeconds(),
	// );

	const resetReasons = () => {
		setOfflineStatus('');
		setDate('');
	};

	const handleClose = () => {
		setOpenModal(false);
	};

	useEffect(() => {
		setDate('');
	}, [offlineStatus]);

	const emptyStateCheck = isEmpty(offlineStatus);
	const customEmptyCheck = date === '';
	// const customEmptyCheck = date === '' && ofTime === null;

	const checks = offlineStatus !== 'custom' ? emptyStateCheck : customEmptyCheck;

	function getWeekDates() {
		const d = new Date();
		const day = d.getDay();
		const startdiff = d.getDate() - day + (day === 0 ? -6 : 1);
		const enddiff = d.getDate() + 7 - day + (day === 0 ? -6 : 1);
		return {
			startDate : new Date(new Date(d.setDate(startdiff)).setHours(0, 0, 0, 0)),
			endDate   : new Date(new Date(d.setDate(enddiff)).setHours(23, 59, 59, 59)),
		};
	}

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
			validity_end = date;
		}

		const data = {
			status         : 'break',
			validity_start : format(
				validity_start,
				'yyyy-MM-dd HH:mm:ss',
			),
			// validity_end: offlineStatus === 'custom' ? customEndTime : format(
			// 	validity_end,
			// 	'yyyy-MM-dd HH:mm:ss',
			// ),
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
							showTimeSelect
							onChange={setDate}
							value={date}
						/>

						{/* <div className={styles.time_title}>
							Time
						</div>
						<Timepicker
							onChange={(val) => {
						    console.log('val:', val);
							}}
							value={ofTime}
						/> */}
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
