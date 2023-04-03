import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';

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
			Toast.error(getApiErrorString(err) || 'Unable to send message, Please try again later!');
		}
	};

	return {
		handleSendMsg,
		loading,
	};
};

export default useCreateMessage;
