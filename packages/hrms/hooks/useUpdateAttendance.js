import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateAttendance = ({ check_in, refetch }) => {
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
			Toast.success(`${check_in ? 'Checkout' : 'Checkin'} Sucessfully`);
			refetch();
		} catch (error) {
			if ((error?.response?.data)) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return { loading, updateAttendance };
};

export default useUpdateAttendance;
