import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useDeleteAllocationQuota = (props) => {
	const { id, onCloseModal, refetch } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/quota_attributes',
		method  : 'POST',
		authkey : 'post_allocation_quota_attributes',
	}, { manual: true });

	const onDelete = async () => {
		try {
			const payload = {
				id,
				status: 'inactive',
			};

			await trigger({
				data: payload,
			});

			onCloseModal();

			refetch();

			Toast.success('Quota deleted successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onDelete,
		loadingDelete: loading,
	};
};

export default useDeleteAllocationQuota;
