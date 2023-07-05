import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const getPersonalInfoPayload = (data) => ({
	...data,
	passport_size_photo_url   : data?.passport_size_photo_url?.finalUrl,
	mobile_number             : data?.mobile_number?.number,
	mobile_country_code       : data?.mobile_number?.country_code,
	date_of_birth             : String(data?.date_of_birth),
	emergency_contact_details : [
		{
			mobile_number       : data?.emergency_contact_details?.number,
			mobile_country_code : data?.emergency_contact_details?.country_code,
		},
	],
});

const getEducationalQualificationsPayload = (data) => ({
	employee_education_details: (data?.educational_qualification || []).map(
		(item) => ({
			...item,
			started_at : String(item.started_at),
			ended_at   : String(item.ended_at),
		}),
	),
});

const getAddressDetailsPayload = (data) => ({
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
});

const getEmploymentHistoryPayload = ({ data, offerLetter, paySlip }) => ({
	employee_experience_details: (data?.employment_history || []).map((item) => ({
		...item,
		started_at   : String(item.started_at),
		ended_at     : String(item.ended_at),
		offer_letter : offerLetter?.finalUrl,
		payslip      : paySlip?.finalUrl,
	})),
});

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
		const GET_PAYLOAD_MAPPING = {
			personal_info             : getPersonalInfoPayload(data),
			educational_qualification : getEducationalQualificationsPayload(data),
			address_details           : getAddressDetailsPayload(data),
			employment_history        : getEmploymentHistoryPayload({ data, offerLetter, paySlip }),
		};

		try {
			await trigger({
				data: {
					id,
					employee_detail_id: id,
					...GET_PAYLOAD_MAPPING?.[formType],
				},
			});
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
