/* eslint-disable custom-eslint/variables-name-check */
/* eslint-disable max-len */
import { Button, Modal } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
// import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback } from 'react';

import useUpdateEmployee from '../../../../hooks/useUpdateEmployee';
import { CONTROL_MAPPING, BASIC_CONTROLS, FAMILY_CONTROLS, ADDRESS_CONTROLS, MEDIA_CONTROLS, PREVIOUS_JOB_HISTORY } from '../../../../utils/configs/personalDetailsControls';

import styles from './styles.module.css';

console.log(PREVIOUS_JOB_HISTORY, 'hist');
const controlMapping = {
	basic       : BASIC_CONTROLS,
	family      : FAMILY_CONTROLS,
	address     : ADDRESS_CONTROLS,
	personal    : MEDIA_CONTROLS,
	job_history : PREVIOUS_JOB_HISTORY,
};
console.log('🚀 ~ file: index.js:25 ~ controlMapping:', controlMapping);

function EditModal({ show = false, handleModal = () => {}, data, mappingKey, getEmployeeDetails }) {
	const { control, handleSubmit, setValue } = useForm();
	const { updateEmployeeDetails, loading } = useUpdateEmployee({ handleModal, getEmployeeDetails });

	const { processed_employee_detail, employee_detail, personal_details } = data || {};

	const { family_details, previous_job_detail } = personal_details || {};

	const controllerData = controlMapping[mappingKey];
	console.log('🚀 ~ file: index.js:36 ~ EditModal ~ controllerData:', controllerData);

	const setValues = useCallback(
		(valObject = {}) => {
			Object.keys(valObject).forEach((key) => {
				setValue(key, valObject?.[key]);
			});
		},
		[setValue],
	);

	useEffect(() => {
		console.log(personal_details?.social_media_links?.github, 'github');
		if (mappingKey === 'basic') {
			setValues({
				first_name     : processed_employee_detail.first_name,
				middle_name    : processed_employee_detail.middle_name,
				last_name      : processed_employee_detail.last_name,
				legal_name     : personal_details.legal_name,
				cogoport_email : employee_detail.cogoport_email,
				personal_email : employee_detail.personal_email,
				mobile_number  : {
					country_code : employee_detail?.mobile_country_code,
					number       : employee_detail?.mobile_number,
				},
				alternate_mobile_number: {
					country_code : personal_details?.alternate_mobile_country_code,
					number       : personal_details?.alternate_mobile_number,
				},
				emergency_contact_number: {
					country_code : employee_detail?.emergency_contact_details.country_code,
					number       : employee_detail?.emergency_contact_details.number,
				},

				gender           : employee_detail.gender,
				date_of_birth    : employee_detail?.date_of_birth && new Date(employee_detail?.date_of_birth),
				disability_level : personal_details.disability_level,
				allergies        : personal_details.allergies,
				marital_status   : personal_details?.marital_status,
				blood_group      : personal_details?.blood_group,
			});
		}
		if (mappingKey === 'personal') {
			setValues({
				linkedin  : personal_details?.social_media_links?.linkedin,
				github    : personal_details?.social_media_links?.github,
				twitter   : personal_details?.social_media_links?.twitter,
				instagram : personal_details?.social_media_links?.instagram,
				figma     : personal_details?.social_media_links?.figma,
				facebook  : personal_details?.social_media_links?.facebook,
			});
		}
		if (mappingKey === 'family') {
			setValues({
				...family_details,
				father_mobile_number: {
					country_code : family_details?.father_mobile_country_code,
					number       : family_details?.father_mobile_number,
				},
				mother_mobile_number: {
					country_code : family_details?.mother_mobile_country_code,
					number       : family_details?.mother_mobile_number,
				},
				guardian_mobile_number: {
					country_code : family_details?.guardian_mobile_country_code,
					number       : family_details?.guardian_mobile_number,
				},
				family_physician_mobile_number: {
					number       : family_details?.family_physician_mobile_number,
					country_code : family_details?.family_physician_country_code,
				},
			});
		}
		if (mappingKey === 'job_history') {
			setValues({
				company_name : previous_job_detail?.company_name,
				type         : previous_job_detail?.type,
				role         : previous_job_detail?.role,
			});
		}

		if (mappingKey === 'address') {
			setValues({
				address : employee_detail?.present_address?.address,
				city    : employee_detail?.present_address?.city,
				country : employee_detail?.present_address?.country,
				pincode : employee_detail?.present_address?.pincode,
				state   : employee_detail?.present_address?.state,
			});
		}
	}, [employee_detail.cogoport_email, employee_detail?.date_of_birth, employee_detail.gender, employee_detail?.mobile_country_code, employee_detail?.mobile_number, employee_detail.personal_email, mappingKey, personal_details.allergies, personal_details?.alternate_mobile_country_code, personal_details?.alternate_mobile_number, personal_details.disability_level, processed_employee_detail.first_name, processed_employee_detail.last_name, setValues, personal_details?.marital_status, personal_details?.blood_group, family_details?.father_mobile_country_code, family_details, employee_detail?.present_address?.address, employee_detail?.present_address?.city, employee_detail?.present_address?.country, employee_detail?.present_address?.pincode, employee_detail?.present_address?.state, processed_employee_detail.middle_name, processed_employee_detail.legal_name, personal_details.emergency_contact_country_code, personal_details.emergency_contact_number, personal_details.linkedin, personal_details.github, personal_details.twitter, personal_details.instagram, personal_details.figma, personal_details.facebook, personal_details?.social_media_links?.linkedin, personal_details?.social_media_links?.github, personal_details?.social_media_links?.twitter, personal_details?.social_media_links?.instagram, personal_details?.social_media_links?.figma, personal_details?.social_media_links?.facebook, personal_details.legal_name, employee_detail?.emergency_contact_details.emergency_contact_country_code, employee_detail?.emergency_contact_details.emergency_contact_number, employee_detail?.emergency_contact_details.country_code, employee_detail?.emergency_contact_details.number, previous_job_detail?.company_name, previous_job_detail?.type, previous_job_detail?.role]);

	const onSubmit = (values) => {
		const valuesMapping = {
			basic: {
				...values,
				// date_of_birth: !isEmpty(values.date_of_birth) ? formatDate({
				// 	date       : values.date_of_birth,
				// 	dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
				// 	formatType : 'date',
				// }) : null,
				date_of_birth: formatDate({
					date       : values.date_of_birth,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
					formatType : 'date',
				}),
				mobile_number                 : values?.mobile_number?.number,
				mobile_country_code           : values?.mobile_number?.country_code,
				alternate_mobile_number       : values?.alternate_mobile_number?.number,
				atternate_mobile_country_code : values?.alternate_mobile_number?.country_code,
			},
			family: {
				...values,
				family_physician_country_code  : values?.family_physician_mobile_number?.country_code,
				family_physician_mobile_number : values?.family_physician_mobile_number?.number,
				father_mobile_country_code     : values?.father_mobile_number?.country_code,
				father_mobile_number           : values?.father_mobile_number?.number,
				guardian_mobile_country_code   : values?.guardian_mobile_number?.country_code,
				guardian_mobile_number         : values?.guardian_mobile_number?.mobile_number,
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

		console.log('finalData', finalData);

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

		console.log('finalValuesData', finalValuesData);

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
									<div key={val.value} className={styles.container_item}>
										<div className={styles.label}>
											{val.label}
										</div>
										<div className={styles.controller}>
											<Element control={control} {...val} />
										</div>
										{/* {errors[val.name] && <div className={styles.error}>{errors[val.name].message}</div>} */}
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

						{/* {
                        data.map((item) => (
	<div className={styles.form_data} key={item.label}>
		{' '}
		<div className={styles.modal_heading}>Enter First Name</div>
		{GetController(item, control)}
	</div>
                        ))
                            } */}

					</div>
				</Modal.Body>
			</Modal>

		</div>
	);
}

export default EditModal;
