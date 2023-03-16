import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogoport/store';
import { toast } from '@cogoport/front/components';

const useDeleteMessage = ({ refetch = () => { }, keys }) => {
	const scope = useSelector(({ general }) => general?.scope);
	const updateShipmentAPI = useRequest(
		'post',
		false,
		scope,
	)('/delete_chat_message');

	const onCreate = async () => {
		try {
			await updateShipmentAPI.trigger({
				data: {
					id: keys,
				},
			});

			refetch();
			toast.success('Msg deleted Successfully!');
		} catch (err) {
			toast.error(err?.data);
		}
	};

	return {
		onCreate,
		loading: updateShipmentAPI.loading,
	};
};

export default useDeleteMessage;
