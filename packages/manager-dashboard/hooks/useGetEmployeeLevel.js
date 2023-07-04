import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetEmployeeLevels = () => {
	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const [{ data, loading }] = useHarbourRequest({
		url    : '/get_employee_level',
		method : 'GET',
		params : {
			user_id: '2fac2a22-dd10-49db-8a5e-ca6188d63cf8' || user?.id,
		},
	}, { manual: false });

	const { level } = data || {};

	return {
		loading,
		level,
	};
};

export default useGetEmployeeLevels;
