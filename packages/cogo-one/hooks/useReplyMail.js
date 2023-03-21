import { usePublicRequest } from '@cogoport/request';

function useReplyMail({ setShowMailModal, setEmailState, setRecipientArray, setBccArray }) {
	const [{ loading }, trigger] = usePublicRequest({
		url    : 'https://lens.dev.cogoport.io/reply_mail',
		method : 'POST',

	}, { manual: true });

	const replyMailApi = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
		} catch (error) {
			// console.log(error)
		} finally {
			setEmailState({});
			setRecipientArray([]);
			setBccArray([]);
			setShowMailModal(false);
		}
	};

	return {
		replyMailApi,
		replyLoading: loading,
	};
}

export default useReplyMail;
