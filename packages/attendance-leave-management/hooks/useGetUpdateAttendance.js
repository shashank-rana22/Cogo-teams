import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';

const useGetUpdateAttendance = (check_in, refetch) => {
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
			Toast.success(`${check_in ? 'Checkout' : 'Checkin'} Sucessfully`);
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};

	return { loading, updateAttendance };
};

export default useGetUpdateAttendance;
