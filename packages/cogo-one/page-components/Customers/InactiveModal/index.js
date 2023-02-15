import { Modal, Button } from '@cogoport/components';
import { useForm, RadioGroupController, DateRangePickerController, TimepickerController } from '@cogoport/forms';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import controls from '../../../configurations/inactive-reasons-form-controls';
import useCreateUserInactiveStatus from '../../../hooks/useCreateUserInactiveStatus';

import styles from './styles.module.css';

function InactiveModal({
	toggleStatus,
	setToggleStatus,
}) {
	const { handleSubmit, control, watch, reset } = useForm();

	const { inactive_status, inactive_date, inactive_time } = controls;

	const watchType = watch() || '';

	const {
		loading,
		userStatus = () => {},
	} = useCreateUserInactiveStatus();
	console.log('watchType', watchType);

	const resetReasons = () => {
		reset('');
	};

	const handleClose = () => {
		setToggleStatus(false);
		reset();
	};

	const checkStatus = watchType?.inactive_status === 'on_lunch' || watchType?.inactive_status === 'on_break';
	const emptyStateCheck = isEmpty(watchType?.inactive_status);
	return (
		<div className={styles.container}>
			<Modal size="sm" show={toggleStatus} onClose={handleClose} placement="top">
				<Modal.Header title="Inactive Status till" />

				<RadioGroupController
					control={control}
					{...inactive_status}
					id={inactive_status.name}
					className={styles.group_radio}

				/>

				<div className={styles.date_range}>
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

				</div>

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
						disable={emptyStateCheck}
						size="md"
						themeType="accent"
						onClick={handleSubmit((data) => userStatus(data))}
					>
						Apply

					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default InactiveModal;
