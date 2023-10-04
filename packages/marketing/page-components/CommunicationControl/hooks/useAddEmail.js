import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useAddEmail = ({ refetch = () => {}, emailType = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_campaign_email_configuration',
		method : 'POST',
	}, { manual: true });

	const addEmail = async (email) => {
		const isValidEmail = email?.match(GLOBAL_CONSTANTS.regex_patterns.email);

		try {
			if (!isValidEmail) {
				Toast.error('Plaese enter valid email');
				return;
			}

			await trigger({
				data: {
					email,
					[emailType]: true,
				},
			});

			Toast.success('Email Added Successfully');
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		addEmailLoading: loading,
		addEmail,
	};
};

export default useAddEmail;
