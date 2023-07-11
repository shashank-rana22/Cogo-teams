import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useGetEmployeeData() {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const params = {
		user_id: userId,
	};

	const [{ loading = false, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_details',
		params,
	}, { manual: false });

	return {
		loading,
		data,
	};
}

export default useGetEmployeeData;
