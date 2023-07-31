import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React, { useState, useEffect, useCallback } from 'react';

import useUpdateEmployeeDetails from '../../../hooks/useUpdateEmployeeDetails';
import { CONTROL_MAPPING } from '../../utils/filterControls';
import getHROPSControls from '../../utils/HROPSControls';

import styles from './styles.module.css';

function HROPSView({ show = false, onClose = () => {}, employeeDetails = {}, refetch = () => {} }) {
	const [isEdit, setIsEdit] = useState(false);

	const { control, handleSubmit, formState : { errors }, watch, setValue } = useForm();

	const { loading, updateEmployeeDetails } = useUpdateEmployeeDetails(onClose, refetch);

	const isCogoFreight = watch('cogo_freight');

	const hropsControls = getHROPSControls(isCogoFreight, isEdit);

	const setValues = useCallback(
		(valObject = {}) => {
			Object.keys(valObject).forEach((key) => {
				setValue(key, valObject?.[key]);
			});
		},
		[setValue],
	);

	const {
		name, employee_code, cogoport_email, designation, department,
		reporting_manager_id, office_location, squad_id, tribe_id, sub_chapter_id,
		chapter_id, li, pi, date_of_joining, resignation_date, cfpl_joining_date, id,
		employee_tags, employee_status,
	} = employeeDetails || {};

	const { lwp, absconding, is_resigned } = employee_tags || {};

	useEffect(() => {
		setValues({
			name,
			employee_code,
			cogoport_email,
			designation,
			department,
			reporting_manager_id,
			office_location,
			squad_id,
			tribe_id,
			sub_chapter_id,
			chapter_id,
			li,
			pi,
			date_of_joining   : date_of_joining && new Date(date_of_joining),
			resignation_date  : resignation_date && new Date(resignation_date),
			absconding        : absconding ? 'true' : 'false',
			cfpl_joining_date : cfpl_joining_date && new Date(cfpl_joining_date),
			cogo_freight      : cfpl_joining_date ? 'true' : 'false',
			lwp               : lwp ? 'true' : 'false',
			employee_status   : is_resigned ? 'notice' : employee_status,
		});
	}, [absconding, cfpl_joining_date, chapter_id, cogoport_email, date_of_joining,
		department, designation, employeeDetails, employee_code, li, name, office_location, pi, reporting_manager_id,
		resignation_date, setValues, squad_id, sub_chapter_id, tribe_id, lwp, employee_status, is_resigned]);

	const onSubmit = (values) => {
		const { employee_status : employeeStatus } = values;

		const dataObj = {
			...values,
			employee_status : employeeStatus === 'notice' ? undefined : employeeStatus,
			is_resigned     : employeeStatus === 'notice',
		};

		updateEmployeeDetails(dataObj, id);
	};

	return (
		<Modal show={show} placement="top" size="lg" onClose={onClose} className={styles.modal}>
			<Modal.Body>
				<div>
					<div className={styles.header_container}>
						<div className={styles.title}>
							Profile Details
						</div>
						<IcMCross className={styles.cross_icon} width={20} height={20} onClick={onClose} />
					</div>
					<form className={styles.employee_details_container} onSubmit={handleSubmit(onSubmit)}>
						{hropsControls.map((val) => {
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
							<Button themeType="secondary" className={styles.edit_btn} onClick={() => setIsEdit(true)}>
								Edit
							</Button>
							<Button type="submit" disabled={!isEdit || loading}>
								Apply
							</Button>
						</div>
					</form>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default HROPSView;
