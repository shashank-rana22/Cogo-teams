import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useDeleteKamLevel(props) {
	const { refetch, transition_level } = props;
	const [{ loading:deleteLoading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration_attributes',
		authkey : 'post_allocation_kam_expertise_configuration_attributes',
	}, { manual: true });

	const onDelete = async () => {
		try {
			const payload = {
				transition_level,
				level_to_be_deleted: true,
			};
			await trigger({
				data: payload,
			});
			refetch();
			Toast.success('Level Deleted');
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
