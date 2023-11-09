/* eslint-disable custom-eslint/variables-name-check */
/* eslint-disable max-len */
import { Button, Modal } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey } from '@cogoport/utils';
import React, { useCallback } from 'react';

import useUpdateEmployee from '../../../../hooks/useUpdateEmployee';
import { CONTROL_MAPPING, BASIC_CONTROLS, FAMILY_CONTROLS, ADDRESS_CONTROLS, MEDIA_CONTROLS, PREVIOUS_JOB_HISTORY } from '../../../../utils/configs/personalDetailsControls';

import styles from './styles.module.css';
import { useEditModalValues } from './useEditModalValue';

const controlMapping = {
	basic       : BASIC_CONTROLS,
	family      : FAMILY_CONTROLS,
	address     : ADDRESS_CONTROLS,
	personal    : MEDIA_CONTROLS,
	job_history : PREVIOUS_JOB_HISTORY,
};

function EditModal({ show = false, handleModal = () => {}, data, mappingKey, getEmployeeDetails }) {
	const { control, handleSubmit, setValue } = useForm();
	const { updateEmployeeDetails, loading } = useUpdateEmployee({ handleModal, getEmployeeDetails });

	const { processed_employee_detail, employee_detail, personal_details, user_role } = data || {};

	const { family_details, previous_job_detail } = personal_details || {};

	const controllerData = controlMapping[mappingKey];

	const setValues = useCallback(
		(valObject = {}) => {
			Object.keys(valObject).forEach((key) => {
				setValue(key, valObject?.[key]);
			});
		},
		[setValue],
	);

	useEditModalValues({
		mappingKey,
		setValues,
		processed_employee_detail,
		personal_details,
		employee_detail,
		family_details,
		previous_job_detail,
	});
	const onSubmit = (values) => {
		const valuesMapping = {
			basic: {
				...values,
				date_of_birth: formatDate({
					date       : values.date_of_birth,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
					formatType : 'date',
				}),
				mobile_number                 : values?.mobile_number?.number,
				mobile_country_code           : values?.mobile_number?.country_code,
				alternate_mobile_number       : values?.alternate_mobile_number?.number,
				alternate_mobile_country_code : values?.alternate_mobile_number?.country_code,
			},
			family: {
				...values,
				family_physician_country_code  : values?.family_physician_mobile_number?.country_code,
				family_physician_mobile_number : values?.family_physician_mobile_number?.number,
				father_mobile_country_code     : values?.father_mobile_number?.country_code,
				father_mobile_number           : values?.father_mobile_number?.number,
				guardian_mobile_country_code   : values?.guardian_mobile_number?.country_code,
				guardian_mobile_number         : values?.guardian_mobile_number?.number,
				mother_mobile_country_code     : values?.mother_mobile_number?.country_code,
				mother_mobile_number           : values?.mother_mobile_number?.number,
			},
			address: {
				...values,
			},
			personal: {
				...values,
			},
			job_history: {
				...values,
			},
		};

		const finalData = valuesMapping[mappingKey];

		const keyObjMapping = {
			basic       : 'personal_details',
			family      : 'family_information',
			address     : 'address_information',
			personal    : 'social_media_links',
			job_history : 'previous_job_detail',

		};

		const nestedKeyMapping = {
			family  : 'family_details',
			address : 'present_address',
		};

		const finalValuesData = { [keyObjMapping[mappingKey]]: ['basic', 'personal', 'job_history'].includes(mappingKey) ? finalData : { [nestedKeyMapping[mappingKey]]: finalData } };

		updateEmployeeDetails(finalValuesData);
	};

	return (
		<div>
			{' '}
			<Modal size="lg" show={show} onClose={handleModal} placement="center">
				<Modal.Header title="Edit Personal Details" />
				<Modal.Body>
					<div className={styles.modal_form}>

						<form className={styles.employee_details_container} onSubmit={handleSubmit(onSubmit)}>
							{(controllerData || []).map((val) => {
								const Element = CONTROL_MAPPING[val.controlType];
								return (
									<div key={val?.name} className={styles.container_item}>
										<div className={styles.label}>
											{val?.label}
										</div>
										<div className={styles.controller}>
											<Element control={control} {...val} disabled={user_role === 'hrbp' ? false : getByKey(data, val?.value_key)} />
										</div>
									</div>
								);
							})}
							<div className={styles.btn_container}>
								<Button themeType="secondary" className={styles.edit_btn} onClick={handleModal}>
									Cancel
								</Button>
								<Button type="submit" loading={loading} disabled={loading}>
									Apply
								</Button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>

		</div>
	);
}

export default EditModal;
