import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateBulkData = ({
	onClose, refetch, setBulkActions, statsRefetch,
	setSelectedIds,
}) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_bulk_employee_details',
	}, { manual: true });

	const updateBulkData = async (values) => {
		try {
			await trigger({
				data: values,
			});
			refetch();
			statsRefetch();
			setSelectedIds([]);
			setBulkActions((prev) => ({ ...prev, bulkEdit: false }));
			onClose();
			Toast.success('Data Updated Sucessfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data || 'Something went wrong'));
		}
	};

	return { loading, updateBulkData };
};

export default useUpdateBulkData;
