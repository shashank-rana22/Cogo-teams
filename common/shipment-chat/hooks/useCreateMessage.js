import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreateMessage = ({ payload, refetch }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_chat_message',
		method : 'POST',
	}, { manual: true });

	const handleSendMsg = async () => {
		try {
			const res = await trigger({
				data: {
					...payload,
				},
			});

			if (!res.hasError) {
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		handleSendMsg,
		loading,
	};
};

export default useCreateMessage;
