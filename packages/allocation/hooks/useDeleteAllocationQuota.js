import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useDeleteAllocationQuota = (props) => {
	const { id, onCloseModal, refetch } = props;

	const [{ loading }, trigger] = useRequest({
		url    : '/update_allocation_quota',
		method : 'POST',
	});

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
