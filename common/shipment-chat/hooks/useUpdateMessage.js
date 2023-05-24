import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateMessage = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_chat_message',
		method : 'POST',
	}, { manual: true });

	const onUpdateMessage = async ({ payload }) => {
		try {
			await trigger({
				data: {
					...payload,
				},
			});

			if (payload?.important === true) {
				Toast.success('Message marked as important');
			} else {
				Toast.success('Message unMarked as important');
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		onUpdateMessage,
		loading,
	};
};

export default useUpdateMessage;
