import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';
/**
 * Single utility hook to Reply All mails from Cogo RPA
 */

const useReplyAllEmail = ({ refetch = () => {} }) => {
	const [replyAllMailApi, triggerReplyAllMail] = useLensRequest({
		url    : 'reply_all',
		method : 'POST',
	}, { manual: true });

	const replyAllEmail = async ({ payload }) => {
		try {
			await triggerReplyAllMail({
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
		replyAllMailApi,
		replyAllEmail,
	};
};

export default useReplyAllEmail;
