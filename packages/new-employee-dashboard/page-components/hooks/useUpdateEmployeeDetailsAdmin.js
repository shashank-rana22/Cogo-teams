import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const getUpdatedKeysInPayload = (newValue, oldValue) => {
	if (typeof oldValue === 'object' && JSON.stringify(oldValue) === JSON.stringify(newValue)) return undefined;
	if (oldValue === newValue) return undefined;
	return newValue;
};

const getPersonalInfoPayload = (data, content) => {
	const { detail } = content || {};

	const NEW_DATA = {};
	(Object.keys(data) || []).forEach((element) => {
		NEW_DATA[element] = getUpdatedKeysInPayload(data[element], detail?.[element]);
	});

	const emergency_contact_details = [
		{
			mobile_number       : data?.emergency_contact_details?.number,
			mobile_country_code : data?.emergency_contact_details?.country_code,
		},
	];

	return {
		...NEW_DATA,
		passport_size_photo_url:
				getUpdatedKeysInPayload(
					data?.passport_size_photo_url?.finalUrl || data?.passport_size_photo_url,
					detail?.passport_size_photo_url,
				),
		mobile_number: getUpdatedKeysInPayload(data?.mobile_number?.number, detail?.mobile_number),
		mobile_country_code:
				getUpdatedKeysInPayload(data?.mobile_number?.country_code, detail?.mobile_country_code),
		date_of_birth: String(data?.date_of_birth),
		emergency_contact_details:
				getUpdatedKeysInPayload(emergency_contact_details, detail?.emergency_contact_details),
	};
};

const getEducationalQualificationsPayload = (data) => ({
	employee_education_details: (data?.educational_qualification || []).map(
		(item) => ({
			...item,
			degree_proof : item?.degree_proof?.finalUrl ? item?.degree_proof?.finalUrl : item?.degree_proof,
			started_at   : String(item.started_at),
			ended_at     : String(item.ended_at),
		}),
	),
});

const getAddressDetailsPayload = (data, content) => {
	const { detail } = content || {};

	console.log('detail :: ', detail);

	const permanent_address = {
		address : data?.permanent_address,
		city    : data?.permanent_city,
		pincode : data?.permanent_pincode,
		state   : data?.permanent_state,
		country : data?.permanent_country,
	};
	const present_address = {
		address : data?.current_address,
		city    : data?.current_city,
		pincode : data?.current_pincode,
		state   : data?.current_state,
		country : data?.current_country,
	};

	return {
		permanent_address : getUpdatedKeysInPayload(permanent_address, detail?.permanent_address),
		present_address   : getUpdatedKeysInPayload(present_address, detail?.present_address),
	};
};

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
	setShow = () => {},
}) {
	const [{ loading }, trigger] = useHarbourRequest(
		{
			url    : '/update_employee_detail',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateEmployeeDetails = async ({ data, formType, content }) => {
		try {
			const GET_PAYLOAD_MAPPING = {
				personal_info             : getPersonalInfoPayload(data, content),
				educational_qualification : getEducationalQualificationsPayload(data),
				address_details           : getAddressDetailsPayload(data, content),
				employment_history        : getEmploymentHistoryPayload({ data, offerLetter, paySlip }),
			};

			await trigger({
				data: {
					id,
					...GET_PAYLOAD_MAPPING?.[formType],
				},
			});

			setShow('');
			getEmployeeDetails();
			// Toast.success('Details have been saved successfully!');
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
