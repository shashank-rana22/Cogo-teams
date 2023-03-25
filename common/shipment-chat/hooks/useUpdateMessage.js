import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateMessage = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_chat_message',
		method : 'POST',
	}, { manual: true });

	const onCreate = async ({ params }) => {
		try {
			await trigger({
				data: {
					...params,
				},
			});

			if (params?.important === true) {
				Toast.success('Message marked as important');
			} else {
				Toast.success('Message unMarked as important');
			}
		} catch (err) {
			Toast.error(err?.data?.message);
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default useUpdateMessage;
