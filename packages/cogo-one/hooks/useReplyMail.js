import { Toast } from '@cogoport/components';
import { usePublicRequest } from '@cogoport/request';

function useReplyMail({
	setShowMailModal = () => {},
	setEmailState = () => {},
	setRecipientArray = () => {},
	setBccArray = () => {},
	buttonType = '',
	setButtonType = () => {},
}) {
	const apiName = {
		reply     : 'reply_mail',
		reply_all : 'reply_all',
		forward   : 'forward_mail',
	};
	const [{ loading }, trigger] = usePublicRequest({
		url    : `https://lens.dev.cogoport.io/${apiName[buttonType]}`,
		method : 'POST',

	}, { manual: true });

	const replyMailApi = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Mail Sent Successfully.');
		} catch (error) {
			// console.log(error)
		} finally {
			setEmailState({});
			setRecipientArray([]);
			setBccArray([]);
			setButtonType('');
			setShowMailModal(false);
		}
	};

	return {
		replyMailApi,
		replyLoading: loading,
	};
}

export default useReplyMail;
