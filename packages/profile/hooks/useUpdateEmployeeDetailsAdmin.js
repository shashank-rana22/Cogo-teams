import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

// const getUpdatedKeysInPayload = (newValue, oldValue) => {
// 	if (typeof oldValue === 'object' && JSON.stringify(oldValue) === JSON.stringify(newValue)) return undefined;
// 	if (oldValue === newValue) return undefined;
// 	return newValue;
// };

// const getEducationalQualificationsPayload = (data, detail) => {
// 	const employee_education_details = (data?.educational_qualification || []).map(
// 		(item) => ({
// 			...item,
// 			degree_proof : item?.degree_proof?.finalUrl ? item?.degree_proof?.finalUrl : item?.degree_proof,
// 			started_at   : item.started_at,
// 			ended_at     : item.ended_at,
// 		}),
// 	);

// 	console.log('employee_education_details', employee_education_details);

// 	return {
// 		employee_education_details:
// 				getUpdatedKeysInPayload(employee_education_details, detail?.employee_education_details),
// 	};
// };

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
	TO_ADD,
	getEmployeeDetails = () => {},
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
					to_add                     : TO_ADD,
					// ...(getEducationalQualificationsPayload(data,) || []),
					employee_education_details : [{
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
