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
				Toast.success('Marked');
			} else {
				Toast.success('UnMarked');
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
