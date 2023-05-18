import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useLensRequest } from '@cogoport/request';

function useReplyMail(mailProps) {
	const {
		setEmailState = () => {},
		setRecipientArray = () => {},
		setBccArray = () => {},
		buttonType = '',
		setButtonType = () => {},
	} = mailProps;

	const apiName = {
		reply     : 'reply_mail',
		reply_all : 'reply_all',
		forward   : 'forward_mail',
		send_mail : 'send_mail',
	};
	const [{ loading }, trigger] = useLensRequest({
		url    : `/${apiName[buttonType]}`,
		method : 'POST',

	}, { manual: true });

	const replyMailApi = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Mail Sent Successfully.');
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		} finally {
			setEmailState({
				body    : '',
				subject : '',
			});
			setRecipientArray([]);
			setBccArray([]);
			setButtonType('');
		}
	};

	return {
		replyMailApi,
		replyLoading: loading,
	};
}

export default useReplyMail;
