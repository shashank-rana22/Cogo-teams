import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogoport/store';

const useAddUser = ({ setOpen = () => { }, refetch = () => { } }) => {
	const scope = useSelector(({ general }) => general?.scope);
	const updateShipmentAPI = useRequest(
		'post',
		false,
		scope,
	)('/create_chat_channel');

	const onCreate = async (values) => {
		try {
			await updateShipmentAPI.trigger({
				data: {
					user_id: values?.user,
					source: 'personal',
				},
			});
			refetch();
			setOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	return {
		onCreate,
		loading: updateShipmentAPI.loading,
	};
};

export default useAddUser;
