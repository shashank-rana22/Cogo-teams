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
	userId = '',
	isMobile = false,
}) {
	const {
		control = {},
		handleSubmit = () => {},
		formState: { isValid = false },
	} = useForm({
		defaultValues: {
			reason : '',
			date   : getEndDayTime(),
		},
	});

	const handleClose = () => {
		setOpenLeaveModal(false);
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
						rules={{ required: true }}
					/>

					<div className={styles.time_title}>
						On Leave Till Date *
					</div>

					<DatepickerController
						placeholder="Select date"
						dateFormat="MM/dd/yyyy HH:mm"
						name="date"
						control={control}
						rules={{ required: true }}
						showTimeSelect
						placement="bottom"
					/>

					<div className={styles.actions}>
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
			</Modal.Body>
		</Modal>
	);
}

export default LeaveModal;
