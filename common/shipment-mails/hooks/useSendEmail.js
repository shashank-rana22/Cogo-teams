import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';
/**
 * Single utility hook to send mails from Cogo RPA
*/

const useSendEmail = ({ refetch = () => {} }) => {
	const [mailApi, triggerCreateMail] = useLensRequest({
		url    : 'send_mail',
		method : 'POST',
	}, { manual: true });

	const createEmail = async ({ payload }) => {
		try {
			await triggerCreateMail({
				data: {
					...payload,
				},
			});
			Toast.success('Email Sent');
			refetch();
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		mailApi,
		createEmail,
	};
};

export default useSendEmail;
