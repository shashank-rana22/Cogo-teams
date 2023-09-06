import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useDeleteLeave = ({ onClose, refetch, refetchList }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_employee_leave_application',
	}, { manual: true });

	const deleteLeave = async (id) => {
		try {
			await trigger({
				data: {
					application_id: id,
				},
			});
			refetchList();
			refetch();
			onClose();
			Toast.success('Leave Deleted Sucessfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, deleteLeave };
};

export default useDeleteLeave;
