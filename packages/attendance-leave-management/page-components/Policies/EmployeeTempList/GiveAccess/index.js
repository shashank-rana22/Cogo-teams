import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import useCreateGeoLocationReq from '../../../../hooks/useCreateGeoLocationReq';
import { LEAVE_CONTROLS, controlMapping } from '../../../../utils/getAccessControls';

import styles from './styles.module.css';

function GiveAccess({
	show = false,
	onClose = () => {},
	// list = [],
	getListGeoLocationReq = () => {},
}) {
	const { createGeoLocationReq, loading } = useCreateGeoLocationReq({ getListGeoLocationReq });
	const { handleSubmit, control, formState : { errors } } = useForm();
	const onSubmit = async (values) => {
		const { attachment_url, date_range, employee_id, remarks } = values || {};
		const { startDate, endDate } = date_range || {};

		const valObj = {
			permission_from_date : startDate,
			permission_to_date   : endDate,
			employee_id,
			status               : 'approved',
			attachment_url       : attachment_url?.finalUrl,
			remarks,
		};
		await createGeoLocationReq(valObj);
		onClose();
	};
	return (

		<Modal size="lg" show={show} onClose={onClose} placement="center">
			<Modal.Header title="Are you sure?" />
			<Modal.Body>
				{LEAVE_CONTROLS.map((val) => {
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
				<Button themeType="secondary" className={styles.cancel_btn} onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button onClick={handleSubmit(onSubmit)} disabled={loading}>
					Submit Request
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default GiveAccess;
