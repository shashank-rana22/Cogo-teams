import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';
/**
 * Single utility hook to Reply mails from Cogo RPA
 */

const useReplyEmail = ({ refetch = () => {} }) => {
	const [replyMailApi, triggerReplyMail] = useLensRequest({
		url    : 'reply_mail',
		method : 'POST',
	}, { manual: true });

	const replyEmail = async ({ payload }) => {
		try {
			await triggerReplyMail({
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
		replyMailApi,
		replyEmail,
	};
};

export default useReplyEmail;
