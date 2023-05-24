import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function useUpdateEmployeeDetails({ id }) {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_employee_detail',
		method : 'POST',
	}, { manual: false });

	const updateEmployeeDetails = async ({ data, formType }) => {
		// const {
		// 	mobile_number,
		// 	mobile_country_code,
		// 	date_of_joining,
		// 	date_of_birth,	...rest
		// } = data || {};

		let payload = {};

		if (formType === 'personal') {
			payload = {
				gender               : data?.gender,
				address              : data?.address,
				document_url         : data?.document_url,
				status               : data?.status || 'active',
				mobile_number        : data?.mobile_number?.number,
				mobile_country_code  : data?.mobile_number?.country_code,
				name                 : data?.name,
				date_of_joining      : String(data?.date_of_joining),
				date_of_birth        : String(data?.date_of_birth),
				updated_at           : String(data?.updated_at),
				created_at           : String(data?.created_at),
				hiring_manager       : data?.hiring_manager,
				hiring_manager_email : data?.hiring_manager_email,
			};
		} else if (formType === 'educational_qualification') {
			payload = {
				employee_education_details: data?.education_qualifications.map((item) => ({
					...item,
					started_at : String(item.started_at),
					ended_at   : String(item.ended_at),
				})),
			};
		} else {
			payload = {
				employee_experience_details: data?.employment_history.map((item) => ({
					...item,
					started_at : String(item.started_at),
					ended_at   : String(item.ended_at),
				})),
			};
		}

		try {
			await trigger({
				data: {
					id,
					employee_detail_id : id,
					performed_by_id    : '5674cb',
					performed_by_type  : '2314fb',
					...payload,
					// ...rest,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};
	return {
		loading,
		updateEmployeeDetails,
	};
}

export default useUpdateEmployeeDetails;
