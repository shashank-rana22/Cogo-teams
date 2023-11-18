import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetSalaryStructure = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : 'get_salary_structure',
	}, { manual: true });

	const { query = 0, debounceQuery } = useDebounceQuery();

	const getSalaryStructure = useCallback(
		async () => {
			if (query) {
				try {
					await trigger({
						params: {
							base_ctc: query,
						},
					});
				} catch (error) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[query, trigger],
	);

	useEffect(() => {
		getSalaryStructure();
	}, [getSalaryStructure]);

	return {
		loading,
		salaryData: data,
		getSalaryStructure,
		debounceQuery,

	};
};

export default useGetSalaryStructure;
