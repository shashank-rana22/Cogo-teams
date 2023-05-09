import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useForwardEmail = ({ refetch = () => {} }) => {
	const [forwardMailApi, triggerForwardMail] = useLensRequest({
		url    : 'forward_mail',
		method : 'POST',
	}, { manual: true });

	const forwardEmail = async ({ payload }) => {
		try {
			await triggerForwardMail({
				data: {
					...payload,
				},
			});
			Toast.success('Email Sent');
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		forwardMailApi,
		forwardEmail,
	};
};

export default useForwardEmail;
