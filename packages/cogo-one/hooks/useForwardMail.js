import { usePublicRequest } from '@cogoport/request';

function useForwardMail({
	setShowMailModal = () => {},
	setEmailState,
	setRecipientArray,
	setBccArray,
}) {
	const [{ loading }, trigger] = usePublicRequest({
		url    : 'https://lens.dev.cogoport.io/forward_mail',
		method : 'POST',

	}, { manual: true });

	const forwardMailApi = async (payload) => {
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
		forwardMailApi,
		forwardLoading: loading,
	};
}

export default useForwardMail;
