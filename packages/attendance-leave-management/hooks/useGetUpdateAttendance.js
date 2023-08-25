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
					performed_by_id: '50d1bb4e-b780-4ec7-ba51-2d1cfaf75f7d',
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
