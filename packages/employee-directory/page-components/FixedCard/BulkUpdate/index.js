import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useUpdateBulkData from '../../../hooks/useUpdateBulkData';
import CONTROLS from '../../utils/bulkUpdateControls';
import { CONTROL_MAPPING } from '../../utils/filterControls';

import styles from './styles.module.css';

const getStatus = (newStatus, oldStatus) => {
	if (newStatus === 'notice') {
		return true;
	}

	if (oldStatus === 'notice' && newStatus !== 'notice') {
		return false;
	}

	return undefined;
};

function BulkUpdate({
	show = false, onClose = () => {},
	refetch = () => {},
	setBulkActions = () => {},
	selectedIds = [],
	statsRefetch = () => {},
	setSelectedIds = () => {},
	filters = {},
}) {
	const { control, handleSubmit, formState : { errors } } = useForm();

	const { updateBulkData, loading } = useUpdateBulkData({
		onClose,
		refetch,
		setBulkActions,
		statsRefetch,
		setSelectedIds,
	});

	const onSubmit = (values) => {
		const { employee_status : employeeStatus } = filters || {};
		const FORM_VALUES = {};

		CONTROLS.forEach((val) => {
			if (!isEmpty(values?.[val?.name])) {
				FORM_VALUES[val.name] = values?.[val?.name];
			}
		});

		const { employee_status } = FORM_VALUES || {};

		const dataObj = {
			...FORM_VALUES,
			employee_status : employee_status === 'notice' ? undefined : employee_status,
			is_resigned     : getStatus(employee_status, employeeStatus),
			employee_ids    : selectedIds,
		};

		updateBulkData(dataObj);
	};

	return (
		<Modal show={show} placement="top" size="lg" onClose={onClose} className={styles.modal}>
			<Modal.Body>
				<div className={styles.header_container}>
					<div className={styles.title}>
						Profile Details
					</div>
					<IcMCross className={styles.cross_icon} width={20} height={20} onClick={onClose} />
				</div>
				<form className={styles.employee_details_container} onSubmit={handleSubmit(onSubmit)}>
					{CONTROLS.map((val) => {
						const Element = CONTROL_MAPPING[val.controlType];

						return (
							<div key={val.value} className={styles.container_item}>
								<div className={styles.label}>
									{val.label}
								</div>
								<div className={styles.controller}>
									<Element control={control} {...val} />
								</div>
								{errors[val.name] && <div className={styles.error}>Required</div>}
							</div>
						);
					})}

					<div className={styles.btn_container}>
						<Button themeType="secondary" className={styles.edit_btn} onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit" disabled={loading}>
							Apply
						</Button>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
}

export default BulkUpdate;
