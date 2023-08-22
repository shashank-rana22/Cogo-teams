import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetEmployeeData = () => {
	const { user } = useSelector((state) => state?.profile);

	const { id: userId } = user || {};

	const [{ loading, data = {} }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_dashboard_employee_details',
		params : {
			employee_user_id: userId,
		},
	}, { manual: false });

	return {
		loading, data,
	};
};

export default useGetEmployeeData;
