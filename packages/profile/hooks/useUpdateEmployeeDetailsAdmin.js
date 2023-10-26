import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const getUpdatedKeysInPayload = (newValue, oldValue) => {
	if (typeof oldValue === 'object' && JSON.stringify(oldValue) === JSON.stringify(newValue)) return undefined;
	if (oldValue === newValue) return undefined;
	return newValue;
};

// const getPersonalInfoPayload = (data, detail) => {
// 	const NEW_DATA = {};
// 	(Object.keys(data) || []).forEach((element) => {
// 		NEW_DATA[element] = getUpdatedKeysInPayload(data[element], detail?.[element]);
// 	});

// 	const emergency_contact_details = [
// 		{
// 			mobile_number       : data?.emergency_contact_details?.number,
// 			mobile_country_code : data?.emergency_contact_details?.country_code,
// 		},
// 	];

// 	return {
// 		...NEW_DATA,
// 		passport_size_photo_url:
// 				getUpdatedKeysInPayload(
// 					data?.passport_size_photo_url?.finalUrl || data?.passport_size_photo_url,
// 					detail?.passport_size_photo_url,
// 				),
// 		mobile_number: getUpdatedKeysInPayload(data?.mobile_number?.number, detail?.mobile_number),
// 		mobile_country_code:
// 				getUpdatedKeysInPayload(data?.mobile_number?.country_code, detail?.mobile_country_code),
// 		date_of_birth: String(data?.date_of_birth),
// 		emergency_contact_details:
// 				getUpdatedKeysInPayload(emergency_contact_details, detail?.emergency_contact_details),
// 	};
// };

const getEducationalQualificationsPayload = (data, detail) => {
	const employee_education_details = (data?.educational_qualification || []).map(
		(item) => ({
			...item,
			degree_proof : item?.degree_proof?.finalUrl ? item?.degree_proof?.finalUrl : item?.degree_proof,
			started_at   : item.started_at,
			ended_at     : item.ended_at,
		}),
	);

	console.log('employee_education_details', employee_education_details);

	return {
		employee_education_details:
				getUpdatedKeysInPayload(employee_education_details, detail?.employee_education_details),
	};
};

// const getEmploymentHistoryPayload = ({ data, offerLetter, paySlip, detail }) => {
// 	const employee_experience_details = (data?.employment_history || []).map((item) => ({
// 		...item,
// 		started_at   : item.started_at,
// 		ended_at     : item.ended_at,
// 		offer_letter : offerLetter?.finalUrl,
// 		payslip      : paySlip?.finalUrl,
// 	}));

// 	return {
// 		employee_experience_details:
// 				getUpdatedKeysInPayload(employee_experience_details, detail?.employee_experience_details),
// 	};
// };

function useUpdateEmployeeDetails({
	id,
	getEmployeeDetails = () => {},
	offerLetter = {},
	paySlip = {},
	setShow = () => {},
}) {
	const [{ loading }, trigger] = useHarbourRequest(
		{
			url    : '/update_employee_detail',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateEmployeeDetails = async (values = {}) => {
		try {
			// const { detail } = content || {};
			// console.log('🚀 ~ file: useUpdateEmployeeDetailsAdmin.js:91 ~ updateEmployeeDetails ~ content:', content);
			console.log('yes printing');

			// console.log('payload', GET_PAYLOAD_MAPPING?.educational_qualification);
			await trigger({
				data: {
					id,
					// ...(getEducationalQualificationsPayload(data,) || []),
					employee_education_details: [{
						...values,
						degree_proof: values?.degree_proof?.finalUrl || values?.degree_proof,
					}],

				},
			});

			setShow('');
			getEmployeeDetails();
			Toast.success('Details have been saved successfully!');
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'Something went wrong',
			);
		}
	};

	return {
		loading,
		updateEmployeeDetails,
	};
}

export default useUpdateEmployeeDetails;
