import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetUpdateAttendance = ({ check_in, refetch, refetchLogs }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_attendance',
	}, { manual: true });

	const updateAttendance = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});
			refetch();
			refetchLogs();
			Toast.success(`${check_in ? 'Checkout' : 'Checkin'} Sucessfully`);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, updateAttendance };
};

export default useGetUpdateAttendance;
