import { Toast } from '@cogoport/components';
import { getApiErrorString } from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateConfiguration = ({
	value = {},
	setShow = () => {},
	listRefetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_allocation_configuration',
		method : 'POST',
	});

	const onDelete = async (allocation_detail_id = '') => {
		try {
			const payload = { id: allocation_detail_id, status: 'inactive' };

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

	const onEdit = async (values) => {
		try {
			const payload = {
				...values,
				id                 : value.id,
				configuration_type : 'custom',
				status             : 'draft',
			};

			await trigger({
				data: payload,
			});

			listRefetch();

			setShow(false);

			Toast.success('Configuration updated successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onDelete,
		onEdit,
		loadingUpdate: loading,
	};
};

export default useUpdateConfiguration;
