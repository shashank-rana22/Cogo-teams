import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback } from 'react';

import useCreateLeaveApplication from '../../hooks/useCreateLeaveApplication';
import { controlMapping, getLeaveControls } from '../../utils/leaveControls';

import styles from './styles.module.css';

function ApplyLeave({
	show = false, onClose = () => {}, data = {},
	refetch = () => {}, selectedData = {}, refetchList = () => {},
	setSelectedData = () => {},
}) {
	const { handleSubmit, control, formState : { errors }, watch, setValue } = useForm();

	const { createLeaveApplication, loading } = useCreateLeaveApplication({
		onClose,
		refetch,
		refetchList,
		setSelectedData,
	});

	const setValues = useCallback(
		(valObject = {}) => {
			Object.keys(valObject).forEach((key) => {
				setValue(key, valObject?.[key]);
			});
		},
		[setValue],
	);

	useEffect(() => {
		if (!isEmpty(selectedData)) {
			const {
				leave_end_date, leave_reason, leave_start_date,
				leave_type, is_halfday, attachment_url, half_day_date,
			} = selectedData || {};

			setValues({
				date_range: {
					startDate : new Date(leave_start_date),
					endDate   : new Date(leave_end_date),
				},
				leave_reason,
				leave_type,
				is_halfday,
				attachment_url,
				half_day      : is_halfday,
				half_day_date : new Date(half_day_date),
			});
		}
	}, [selectedData, setValues]);

	const isHalfDay = watch('half_day');
	const leaveType = watch('leave_type');
	const controls = getLeaveControls(isHalfDay);

	const onSubmit = (values) => {
		const valObj = {
			...values,
			leave_application_id: selectedData?.id,
		};
		createLeaveApplication(valObj);
	};

	return (
		<Modal size="md" show={show} onClose={onClose} placement="top" className={styles.modal}>
			<Modal.Header title={`${selectedData ? 'Edit' : 'Apply'} Leave`} />
			<Modal.Body>
				{controls.map((val) => {
					const Element = controlMapping[val.controlType];
					return (
						<div key={val.name} className={styles.control_container}>
							<div className={styles.label}>{val.controlLabel}</div>
							<Element control={control} key={val.name} {...val} />
							{errors[val.name] && <div className={styles.error_msg}>{errors[val.name].message}</div>}
							{val.name === 'leave_type' && leaveType && (
								<div className={styles.leave_type_stats}>
									<div className={styles.pending}>
										Pending :
										{' '}
										{data[`total_pending_${leaveType}_approvals`]
										|| GLOBAL_CONSTANTS.zeroth_index}
									</div>
									<div className={styles.available}>
										Available :
										{' '}
										{data[`available_${leaveType}s`] || GLOBAL_CONSTANTS.zeroth_index}
									</div>
								</div>
							)}
						</div>
					);
				})}
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" disabled={loading} className={styles.cancel_btn} onClick={onClose}>
					Cancel
				</Button>
				<Button onClick={handleSubmit(onSubmit)} disabled={loading}>
					Submit Request
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ApplyLeave;
