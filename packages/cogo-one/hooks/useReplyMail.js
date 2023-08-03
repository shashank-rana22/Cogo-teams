import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useLensRequest } from '@cogoport/request';

import { DEFAULT_EMAIL_STATE } from '../constants/mailConstants';

const API_MAPPING = {
	reply     : 'reply_mail',
	reply_all : 'reply_all',
	forward   : 'forward_mail',
	send_mail : 'send_mail',
};

function useReplyMail(mailProps) {
	const {
		setEmailState = () => {},
		buttonType = '',
		setButtonType = () => {},
	} = mailProps;

	const [{ loading }, trigger] = useLensRequest({
		url    : `/${API_MAPPING[buttonType]}`,
		method : 'POST',

	}, { manual: true });

	const replyMailApi = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Mail Sent Successfully.');
			setEmailState(DEFAULT_EMAIL_STATE);
			setButtonType('');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		replyMailApi,
		replyLoading: loading,
	};
}

export default useReplyMail;
