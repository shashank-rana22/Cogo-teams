import { Modal, Button } from '@cogoport/components';
import {
	DatepickerController,
	SelectController,
	TextAreaController,
	TimepickerController,
	useForm,
} from '@cogoport/forms';
import { IcMRefresh } from '@cogoport/icons-react';
import React from 'react';

import { OFFLINE_STATUS_OPTIONS, OFFLINE_REASONS_OPTIONS } from '../../../../../../constants';

import styles from './styles.module.css';
import { createSubmit, getEndDayTime } from './submitFunctions';

function InactiveModal({
	updateUserStatus = () => {},
	setOpenModal = () => {},
	loading = false,
	userId = '',
	isMobile = false,
}) {
	const {
		control = {},
		watch = () => {},
		reset = () => {},
		setValue = () => {},
		handleSubmit = () => {},
		formState: { isValid = false },
	} = useForm({
		defaultValues: {
			reason        : '',
			comment       : '',
			offTime       : '',
			date          : '',
			offlineStatus : '',
		},
	});

	const {
		reason = '',
		offlineStatus = '',
	} = watch();

	const handleClose = () => {
		setOpenModal(false);
	};

	const handleChangeStatus = (val) => {
		if (val === 'custom') {
			setValue('date', new Date());
			setValue('offTime', getEndDayTime());
		}
	};

	const handleFormSubmit = (values) => {
		createSubmit({
			values,
			updateUserStatus,
			userId,
		});
	};

	return (
		<Modal
			size="sm"
			show
			onClose={handleClose}
			placement={isMobile ? 'bottom' : 'top'}
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
					rules={{ required: true }}
				/>

				{reason === 'others' && (
					<TextAreaController
						control={control}
						name="comment"
						size="sm"
						placeholder="Enter the specific reason"
						rules={{ required: true }}
					/>
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
					rules={{ required: true }}
				/>

				{offlineStatus === 'custom' && (
					<>
						<div className={styles.time_title}>Date</div>
						<DatepickerController
							placeholder="Select date"
							dateFormat="MM/dd/yyyy"
							name="date"
							control={control}
							rules={{ required: true }}
						/>

						<div className={styles.time_title}>Time</div>
						<TimepickerController
							placeholder="Select time"
							control={control}
							name="offTime"
							rules={{ required: true }}
						/>
					</>
				)}

				<div className={styles.actions}>
					<Button
						size="md"
						themeType="tertiary"
						onClick={reset}
						disabled={loading}
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
						disabled={!isValid}
						size="md"
						themeType="accent"
						className={styles.last_button}
						onClick={handleSubmit(handleFormSubmit)}
					>
						Apply
					</Button>
				</div>
			</div>
		</Modal>

	);
}

export default InactiveModal;
