import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useDeleteKamLevel(props) {
	const {
		refetch,
		transition_level,
		cardRefetch,
		t = () => {},
	} = props;

	const [{ loading : deleteLoading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration_attributes',
		authkey : 'post_allocation_kam_expertise_configuration_attributes',
	}, { manual: true });

	const onDelete = async () => {
		try {
			const payload = {
				transition_level,
				status: 'inactive',
			};

			await trigger({
				data: payload,
			});

			refetch();

			cardRefetch();

			Toast.success(t('allocation:level_deleted_toast_error'));
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};
	return {
		deleteLoading,
		onDelete,
	};
}

export default useDeleteKamLevel;
