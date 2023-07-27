import { Modal, Button, Select, Datepicker, Timepicker, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty, addHours } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { OFFLINE_STATUS_OPTIONS, OFFLINE_REASONS_OPTIONS } from '../../../../constants';
import getWeekDates from '../../../../utils/getWeekDates';

import styles from './styles.module.css';

const ADD_HOURS_BY_ONE = 1;
const ADD_HOURS_BY_FOUR = 4;
const MIN_START_HOURS = 0;
const MAX_START_HOURS = 23;
const MIN_SECOND = 59;
const MIN_MILLI_SECOND = 999;

function InactiveModal({
	updateUserStatus = () => {},
	setOpenModal = () => {},
	loading = false,

}) {
	const [offlineStatus, setOfflineStatus] = useState('');
	const [date, setDate] = useState(new Date());
	const [ofTime, setOfTime] = useState(new Date());
	const [offlineReason, setOfflineReason] = useState({
		reason  : '',
		comment : '',
	});

	const customEndTime = date.setHours(
		ofTime.getHours(),
		ofTime.getMinutes(),
		ofTime.getSeconds(),
	);

	const resetReasons = () => {
		setOfflineStatus('');
		setDate(new Date());
		setOfTime(new Date());
		setOfflineReason({
			reason  : '',
			comment : '',
		});
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
			validity_end = addHours(new Date(), ADD_HOURS_BY_ONE);
		} else if (offlineStatus === '4_hour') {
			validity_start = new Date();
			validity_end = addHours(new Date(), ADD_HOURS_BY_FOUR);
		} else if (offlineStatus === 'today') {
			validity_start = new Date((new Date()).setHours(
				MIN_START_HOURS,
				MIN_START_HOURS,
				MIN_START_HOURS,
				MIN_START_HOURS,
			));
			validity_end = new Date((new Date()).setHours(MAX_START_HOURS, MIN_SECOND, MIN_SECOND, MIN_MILLI_SECOND));
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
			validity_start : formatDate({
				date: validity_start,
				dateFormat:
							GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
				formatType : 'dateTime',
				separator  : ' ',
			}),
			validity_end: formatDate({
				date: validity_end,
				dateFormat:
							GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
				formatType : 'dateTime',
				separator  : ' ',
			}),
			reason: offlineReason.reason === 'others' ? offlineReason.comment : offlineReason.reason,
		};

		updateUserStatus(data);
	};

	return (
		<Modal size="sm" show onClose={handleClose} placement="top">
			<Modal.Header title="Offline Status" />

			<div className={styles.duration_section}>
				<div className={styles.time_title}>
					Select offline reason
				</div>
				<Select
					value={offlineReason.reason}
					onChange={(val) => setOfflineReason((prev) => ({ ...prev, reason: val }))}
					placeholder="Select reason"
					options={OFFLINE_REASONS_OPTIONS}
					isClearable
				/>
				{offlineReason.reason === 'others' && (
					<Textarea
						name="a4"
						size="sm"
						placeholder="Enter the specific reason"
						value={offlineReason.comment}
						onChange={(val) => setOfflineReason((prev) => ({ ...prev, comment: val }))}
					/>
				)}

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
