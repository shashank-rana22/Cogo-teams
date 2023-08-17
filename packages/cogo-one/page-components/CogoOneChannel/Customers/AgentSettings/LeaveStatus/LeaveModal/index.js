import { Modal, Button } from '@cogoport/components';
import {
	DatepickerController,
	TextAreaController,
	useForm,
} from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';
import { createSubmit, getEndDayTime } from './submitFunctions';

function LeaveModal({
	updateUserStatus = () => {},
	setOpenLeaveModal = () => {},
	loading = false,
}) {
	const {
		control,
		watch,
	} = useForm({
		defaultValues: {
			reason : '',
			date   : getEndDayTime(),
		},
	});

	const {
		reason = '',
		date = '',
	} = watch();

	const handleClose = () => {
		setOpenLeaveModal(false);
	};

	return (
		<Modal
			size="sm"
			show
			onClose={handleClose}
			placement="top"
			className={styles.styled_modal}
		>
			<Modal.Header title="Update Leave Status" />
			<Modal.Body>
				<div className={styles.duration_section}>
					<div className={styles.time_title}>
						Enter Leave Reason *
					</div>

					<TextAreaController
						control={control}
						name="reason"
						size="sm"
						rows={3}
						placeholder="Enter the specific reason"
					/>

					<div className={styles.time_title}>
						On Leave Till Date *
					</div>

					<DatepickerController
						placeholder="Select date"
						dateFormat="MM/dd/yyyy HH:mm"
						name="date"
						control={control}
						showTimeSelect
					/>

					<div className={styles.actions}>
						<Button
							loading={loading}
							disabled={!reason || !date}
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
			</Modal.Body>
		</Modal>
	);
}

export default LeaveModal;
