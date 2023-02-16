import { Modal, Button, Datepicker, RadioGroup } from '@cogoport/components';
// import { useForm, RadioGroupController, DateRangePickerController, TimepickerController } from '@cogoport/forms';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

// import controls from '../../../configurations/inactive-reasons-form-controls';
import useCreateUserInactiveStatus from '../../../hooks/useCreateUserInactiveStatus';

import styles from './styles.module.css';

function InactiveModal({
	toggleStatus,
	setToggleStatus,
}) {
	// const { handleSubmit, control, watch, reset } = useForm();

	// const { inactive_status, inactive_date, inactive_time } = controls;

	// const watchType = watch() || '';
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [inactiveReason, setInactiveReason] = useState('');

	const {
		loading,
		userStatus = () => {},
	} = useCreateUserInactiveStatus();

	// console.log('watchType', watchType);

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

	// const checkStatus = watchType?.inactive_status === 'on_lunch' || watchType?.inactive_status === 'on_break';
	const emptyStateCheck = isEmpty(inactiveReason);

	return (
		<div className={styles.container}>
			<Modal size="sm" show={toggleStatus} onClose={handleClose} placement="top">
				<Modal.Header title="Inactive Status till" />

				{/* <RadioGroupController
					control={control}
					{...inactive_status}
					id={inactive_status.name}
					className={styles.group_radio}

				/> */}
				<RadioGroup options={REASONS} onChange={setInactiveReason} value={inactiveReason} />

				{/* <Datepicker
					placeholder="Enter Date"
					showTimeSelect
					dateFormat="MM/dd/yyyy HH:mm"
					name="date"
					onChange={setDate}
					value={date}
				/> */}
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

				{/* <div className={styles.date_range}>
					{watchType?.inactive_status === 'on_leave' && (
						<DateRangePickerController
							control={control}
							{...inactive_date}
							id={inactive_date.name}
						/>
					)}

					{checkStatus && (
						<TimepickerController
							control={control}
							{...inactive_time}
							id={inactive_time.name}
						/>
					)}

				</div> */}

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
