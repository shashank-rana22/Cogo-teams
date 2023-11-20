import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetSalaryStructure = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_salary_structure',
	}, { manual: true });

	const getStructure = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						base_ctc     : query,
						require_keys : true,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[query, trigger],
	);

	useEffect(() => {
		if (query) getStructure();
	}, [getStructure, query]);

	return { loading, data, debounceQuery, searchQuery, setSearchQuery };
};

export default useGetSalaryStructure;
