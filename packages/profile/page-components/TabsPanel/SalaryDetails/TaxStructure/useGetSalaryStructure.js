import { Toast } from '@cogoport/components';
// import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetSalaryStructure = (employee_id) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_salary_structure',
	}, { manual: true });

	const getStructure = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						employee_detail_id: employee_id,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[employee_id, trigger],
	);

	useEffect(() => {
		if (employee_id) {
			getStructure();
		}
	}, [employee_id, getStructure]);

	return { loading, data, getStructure };
};

export default useGetSalaryStructure;
