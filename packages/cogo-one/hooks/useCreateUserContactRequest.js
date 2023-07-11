import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const getPayload = ({ user, values }) => {
	const { custome_reason = '', reason = '' } = values || {};
	const {
		mobile_country_code = '',
		mobile_number = '',
		user_id,
	} = user || {};

	const countryCode = mobile_country_code
		? mobile_country_code.replace('+', '')
		: '';

	const mobileNumber = `${countryCode}${mobile_number}`;

	return {
		user_id,
		contact      : mobileNumber,
		contact_type : 'mobile_number',
		reason       : reason === 'other' ? custome_reason : reason,
	};
};

const useCreateUserContactRequest = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_user_contact_request',
		method : 'post',
	}, { manual: true });

	const createUserContactRequest = async ({ values, user = {} }) => {
		const { custome_reason = '', reason = '' } = values || {};

		if (!reason) {
			Toast.error('Please enter reason.');
			return;
		}

		if (reason === 'other' && !custome_reason) {
			Toast.error('Please Enter Other Reason');
			return;
		}

		try {
			await trigger({
				data: getPayload({ user, values }),
			});
		} catch (error) {
			console.error(error);
		}
	};

	return {
		loading,
		createUserContactRequest,
	};
};

export default useCreateUserContactRequest;
