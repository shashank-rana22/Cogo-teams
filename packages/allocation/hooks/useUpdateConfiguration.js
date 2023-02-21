import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useUpdateConfiguration = ({
	item = {},
	setShow = () => {},
	listRefetch = () => {},
}) => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/configuration_attributes',
		method  : 'POST',
		authkey : 'post_allocation_configuration_attributes',
	});

	const onDelete = async () => {
		try {
			const payload = { id: item.id, status: 'inactive' };

			await trigger({
				data: payload,
			});

			setShow(false);

			listRefetch();

			Toast.success('Configuration deleted successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onDelete,
		loadingUpdate: loading,
	};
};

export default useUpdateConfiguration;
