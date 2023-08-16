import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import { controlMapping, getLeaveControls } from '../../utils/leaveControls';

import styles from './styles.module.css';

function ApplyLeave({ show = false, onClose = () => {} }) {
	const { handleSubmit, control, formState : { errors }, watch } = useForm();

	const isHalfDay = watch('half_day');

	const controls = getLeaveControls(isHalfDay);

	const onSubmit = (values) => {
		console.log('handleSubmit', values);
	};

	return (
		<Modal size="md" show={show} onClose={onClose} placement="top">
			<Modal.Header title="Apply Leave" />
			<Modal.Body>
				{controls.map((val) => {
					const Element = controlMapping[val.controlType];
					return (
						<div key={val.name} className={styles.control_container}>
							<div className={styles.label}>{val.controlLabel}</div>
							<Element control={control} key={val.name} {...val} />
							{errors[val.name] && <div className={styles.error_msg}>{errors[val.name].message}</div>}
						</div>
					);
				})}
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" className={styles.cancel_btn} onClick={onClose}>
					Cancel
				</Button>
				<Button onClick={handleSubmit(onSubmit)}>
					Submit Request
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ApplyLeave;
