import { usePublicRequest } from '@cogoport/request';

function useReplyAllMail({ setShowMailModal, setEmailState, setRecipientArray, setBccArray }) {
	const [{ loading }, trigger] = usePublicRequest({
		url    : 'https://lens.dev.cogoport.io/reply_all',
		method : 'POST',

	}, { manual: true });

	const replyAlllMailApi = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
		} catch (error) {
			// console.log(error)
		} finally {
			setEmailState({});
			setBccArray([]);
			setRecipientArray([]);
			setShowMailModal(false);
		}
	};

	return {
		replyAlllMailApi,
		replyAllLoading: loading,
	};
}

export default useReplyAllMail;
