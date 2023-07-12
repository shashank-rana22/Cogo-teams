import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const getPayload = ({ user_id, values, mobileNumber }) => {
	const { custome_reason = '', reason = '' } = values || {};

	return {
		user_id,
		contact      : mobileNumber,
		contact_type : 'mobile_number',
		reason       : reason === 'other' ? custome_reason : reason,
	};
};

const useCreateUserContactRequest = ({ setMaskConfig }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_user_contact_request',
		method : 'post',
	}, { manual: true });

	const createUserContactRequest = async ({ values, user = {}, reset = () => {} }) => {
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

		if (!reason) {
			Toast.error('Please select reason.');
			return;
		}

		if (reason === 'other' && !custome_reason) {
			Toast.error('Please Enter Other Reason');
			return;
		}

		try {
			await trigger({
				data: getPayload({ user_id, values, mobileNumber }),
			});
			reset();
			navigator.clipboard.writeText(mobileNumber);
			Toast.success('Successfully copied to clipboard');

			setMaskConfig({
				showNumber      : true,
				showReasonModal : false,
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
