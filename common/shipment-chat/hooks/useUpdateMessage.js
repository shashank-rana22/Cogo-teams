import { toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateMessage = () => {
	const scope = useSelector(({ general }) => general?.scope);

	const updateShipmentAPI = useRequest(
		'post',
		false,
		scope,
	)('/update_chat_message');

	const onCreate = async ({ params }) => {
		try {
			await updateShipmentAPI.trigger({
				data: {
					...params,
				},
			});

			if (params?.important === true) {
				toast.success('Marked');
			} else {
				toast.success('UnMarked');
			}
		} catch (err) {
			toast.error(err?.data?.message);
		}
	};

	return {
		onCreate,
		loading: updateShipmentAPI.loading,
	};
};

export default useUpdateMessage;
