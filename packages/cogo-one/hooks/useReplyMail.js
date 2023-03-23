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
		url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/${apiName[buttonType]}`,
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
			setEmailState({
				body    : '',
				subject : '',
			});
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
