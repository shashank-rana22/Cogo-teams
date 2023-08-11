import { Modal, Button } from '@cogoport/components';
import {
	DatepickerController,
	SelectController,
	TextAreaController,
	TimepickerController,
	useForm,
} from '@cogoport/forms';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { OFFLINE_STATUS_OPTIONS, OFFLINE_REASONS_OPTIONS } from '../../../../constants';

import styles from './styles.module.css';
import { createSubmit, getEndDayTime } from './submitFunctions';

function InactiveModal({
	updateUserStatus = () => {},
	setOpenModal = () => {},
	loading = false,
}) {
	const {
		control,
		watch,
		reset,
		setValue,
	} = useForm({
		defaultValues: {
			reason        : '',
			comment       : '',
			ofTime        : '',
			date          : '',
			offlineStatus : '',
		},
	});

	const {
		reason = '',
		comment = '',
		date = '',
		offlineStatus = '',
	} = watch();

	const handleClose = () => {
		setOpenModal(false);
	};

	const emptyStateCheck = isEmpty(offlineStatus) || !reason;
	const customEmptyCheck = date === '';

	const checks = offlineStatus !== 'custom' ? emptyStateCheck : customEmptyCheck;

	const handleChangeStatus = (_, val) => {
		if (val) {
			setValue('date', new Date());
			setValue('ofTime', getEndDayTime());
		}
	};

	return (
		<Modal
			size="sm"
			show
			onClose={handleClose}
			placement="top"
			className={styles.styled_modal}
		>
			<Modal.Header title="Offline Status" />

			<div className={styles.duration_section}>
				<div className={styles.time_title}>
					Select offline reason *
				</div>

				<SelectController
					control={control}
					name="reason"
					placeholder="Select reason"
					options={OFFLINE_REASONS_OPTIONS}
				/>

				{reason === 'others' && (
					<>
						<TextAreaController
							control={control}
							name="comment"
							size="sm"
							placeholder="Enter the specific reason"
						/>

						{!comment && (
							<div className={styles.error_text}>
								required*
							</div>
						)}
					</>
				)}

				<div className={styles.time_title}>
					Set offline status till *
				</div>

				<SelectController
					name="offlineStatus"
					control={control}
					placeholder="Select here..."
					options={OFFLINE_STATUS_OPTIONS}
					onChange={handleChangeStatus}
				/>

				{offlineStatus === 'custom' && (
					<>
						<div className={styles.time_title}>Date</div>
						<DatepickerController
							placeholder="Select date"
							dateFormat="MM/dd/yyyy"
							name="date"
							control={control}
						/>

						<div className={styles.time_title}>Time</div>
						<TimepickerController
							placeholder="Select time"
							control={control}
							name="ofTime"
						/>
					</>
				)}

				<div className={styles.actions}>
					<Button
						size="md"
						themeType="tertiary"
						onClick={reset}
						disabled={loading || checks}
					>
						<IcMRefresh
							width={16}
							height={16}
							className={styles.refresh_icon}
						/>
						Reset Status
					</Button>

					<Button
						loading={loading}
						disabled={checks}
						size="md"
						themeType="accent"
						className={styles.last_button}
						onClick={() => createSubmit({
							watch,
							updateUserStatus,
						})}
					>
						Apply
					</Button>
				</div>
			</div>
		</Modal>

	);
}

export default InactiveModal;
