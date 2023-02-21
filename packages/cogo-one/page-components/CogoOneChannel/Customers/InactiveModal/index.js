import { Modal, Button, RadioGroup } from '@cogoport/components';
import {
	useForm,
	InputController,
} from '@cogoport/forms';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import controls from '../../../../configurations/user-status-controls';

import styles from './styles.module.css';

function InactiveModal({
	updateUserStatus,
	setOpenModal,
	loading,

}) {
	const { days = '', hours = '', minutes = '' } = controls;
	const [formError, setFormError] = useState('');
	const [inactiveReason, setInactiveReason] = useState('');

	const { handleSubmit, control, reset } = useForm();

	const REASONS = [
		{
			label : 'On Break',
			value : 'break',
		},
	];

	const resetReasons = () => {
		setInactiveReason('');
		reset({ days: '', hours: '', minutes: '' });
	};

	const handleClose = () => {
		setOpenModal(false);
		reset({ days: '', hours: '', minutes: '' });
	};

	const createSubmit = (val) => {
		const duration = Number(val?.days || 0) * 1440 + Number(val?.hours || 0) * 60 + Number(val?.minutes || 0);

		const data = {
			status: inactiveReason,
			duration,
		};
		if (isEmpty(val?.days) && isEmpty(val?.hours) && isEmpty(val?.minutes)) {
			setFormError('Please select duration');
		} else if (val?.minutes < 0 || val?.minutes > 59) {
			setFormError('Minutes should range between 0 to 59');
		} else if (val?.hours > 24) {
			setFormError('Hours should be lessthen or equal 24');
		} else {
			updateUserStatus(data);
		}
	};

	const emptyStateCheck = isEmpty(inactiveReason);

	return (

		<Modal size="sm" show onClose={handleClose} placement="top" className={styles.styled_modal}>
			<Modal.Header title="Inactive Status till" />

			<RadioGroup options={REASONS} onChange={setInactiveReason} value={inactiveReason} />

			<div className={styles.time_title}>
				Duration
			</div>

			<div className={styles.duration_div}>
				<InputController
					{...days}
					id={days?.name}
					control={control}
				/>
				<InputController
					{...hours}
					control={control}
					id={hours?.name}
				/>
				<InputController
					{...minutes}
					control={control}
					id={minutes?.name}
				/>
			</div>
			{!isEmpty(formError) && (
				<div className={styles.form_error}>
					{formError}
				</div>
			)}
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
					onClick={handleSubmit(createSubmit)}
					className={styles.last_button}
				>
					Apply

				</Button>
			</div>
		</Modal>

	);
}

export default InactiveModal;
