import { useEffect } from 'react';

export function useEditModalValues({
	mappingKey,
	setValues,
	processed_employee_detail,
	personal_details,
	employee_detail,
	family_details,
	previous_job_detail,
}) {
	useEffect(() => {
		if (mappingKey === 'basic') {
			setValues({
				first_name     : processed_employee_detail?.first_name,
				middle_name    : processed_employee_detail?.middle_name,
				last_name      : processed_employee_detail?.last_name,
				legal_name     : personal_details?.legal_name,
				cogoport_email : employee_detail?.cogoport_email,
				personal_email : employee_detail?.personal_email,
				mobile_number  : {
					country_code : employee_detail?.mobile_country_code,
					number       : employee_detail?.mobile_number,
				},
				alternate_mobile_number: {
					country_code : personal_details?.alternate_mobile_country_code,
					number       : personal_details?.alternate_mobile_number,
				},
				emergency_contact_number: {
					country_code : employee_detail?.emergency_contact_details?.country_code,
					number       : employee_detail?.emergency_contact_details?.number,
				},

				gender           : employee_detail?.gender,
				date_of_birth    : employee_detail?.date_of_birth && new Date(employee_detail?.date_of_birth),
				disability_level : personal_details?.disability_level,
				allergies        : personal_details?.allergies,
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
	}, [employee_detail?.cogoport_email,
		employee_detail?.date_of_birth, employee_detail?.gender,
		employee_detail?.mobile_country_code, employee_detail?.mobile_number,
		employee_detail?.personal_email, mappingKey, personal_details?.allergies,
		personal_details?.alternate_mobile_country_code, personal_details?.alternate_mobile_number,
		personal_details?.disability_level, processed_employee_detail?.first_name,
		processed_employee_detail?.last_name, setValues, personal_details?.marital_status,
		personal_details?.blood_group, family_details?.father_mobile_country_code, family_details,
		employee_detail?.present_address?.address, employee_detail?.present_address?.city,
		employee_detail?.present_address?.country, employee_detail?.present_address?.pincode,
		employee_detail?.present_address?.state, processed_employee_detail?.middle_name,
		processed_employee_detail?.legal_name, personal_details?.emergency_contact_country_code,
		personal_details?.emergency_contact_number, personal_details?.linkedin, personal_details?.github,
		personal_details?.twitter, personal_details?.instagram, personal_details?.figma,
		personal_details?.facebook, personal_details?.social_media_links?.linkedin,
		personal_details?.social_media_links?.github, personal_details?.social_media_links?.twitter,
		personal_details?.social_media_links?.instagram, personal_details?.social_media_links?.figma,
		personal_details?.social_media_links?.facebook, personal_details?.legal_name,
		employee_detail?.emergency_contact_details?.emergency_contact_country_code,
		employee_detail?.emergency_contact_details?.emergency_contact_number,
		employee_detail?.emergency_contact_details?.country_code,
		employee_detail?.emergency_contact_details?.number,
		previous_job_detail?.company_name, previous_job_detail?.type, previous_job_detail?.role]);
}

export default useEditModalValues;
