import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetCurrentPayroll = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_current_payroll',
	}, { manual: true });

	const getCurrentPayroll = useCallback(
		async (employee_id, id) => {
			await trigger({
				params: {
					employee_id,
					id,
				},
			});
		},
		[trigger],
	);

	return { loading, data, getCurrentPayroll };
};

export default useGetCurrentPayroll;
