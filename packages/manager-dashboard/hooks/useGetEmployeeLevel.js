import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetEmployeeLevels = () => {
	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const [{ data, loading }] = useHarbourRequest({
		url    : '/get_employee_level',
		method : 'GET',
		params : {
			user_id: user?.id,
		},
	}, { manual: false });

	const { level } = data || {};

	return {
		loading,
		level,
	};
};

export default useGetEmployeeLevels;
