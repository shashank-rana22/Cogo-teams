import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function useUpdateEmployeeDetails({
	id,
	getEmployeeDetails = () => {},
	offerLetter = {},
	paySlip = {},
}) {
	const [{ loading }, trigger] = useHarbourRequest(
		{
			url    : '/update_employee_detail',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateEmployeeDetails = async ({ data, formType }) => {
		let payload = {};

		if (formType === 'personal_info') {
			payload = {
				...data,
				passport_size_photo_url   : data?.passport_size_photo_url?.finalUrl,
				status                    : data?.status || 'active',
				mobile_number             : data?.mobile_number?.number,
				mobile_country_code       : data?.mobile_number?.country_code,
				date_of_joining           : String(data?.date_of_joining),
				date_of_birth             : String(data?.date_of_birth),
				updated_at                : String(data?.updated_at),
				created_at                : String(data?.created_at),
				emergency_contact_details : [
					{
						mobile_number       : data?.emergency_contact_details?.number,
						mobile_country_code : data?.emergency_contact_details?.country_code,
					},
				],
			};
		} else if (formType === 'educational_qualification') {
			payload = {
				employee_education_details: data?.education_qualifications.map(
					(item) => ({
						...item,
						started_at : String(item.started_at),
						ended_at   : String(item.ended_at),
					}),
				),
			};
		} else if (formType === 'address_details') {
			payload = {
				permanent_address: {
					address : data?.permanent_address,
					city    : data?.permanent_city,
					pincode : data?.permanent_pincode,
					state   : data?.permanent_state,
					country : data?.permanent_country,
				},
				present_address: {
					address : data?.current_address,
					city    : data?.current_city,
					pincode : data?.current_pincode,
					state   : data?.current_state,
					country : data?.current_country,
				},
			};
		} else {
			payload = {
				employee_experience_details: data?.employment_history.map((item) => ({
					...item,
					started_at   : String(item.started_at),
					ended_at     : String(item.ended_at),
					offer_letter : offerLetter?.finalUrl,
					payslip      : paySlip?.finalUrl,
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
				},
			});
			getEmployeeDetails();
			Toast.success('Details have been saved successfully!');
		} catch (err) {
			console.log('err', err);
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
