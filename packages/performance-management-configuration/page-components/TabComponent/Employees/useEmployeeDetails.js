import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import getColumns from './getColumns';

const DEFAULT_PAGE = 1;

const useEmployeeDetails = () => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(DEFAULT_PAGE);

	const [{ loading, data }, trigger] = useHarbourRequest(
		{
			method : 'get',
			url    : '/list_employee_details',
		},
		{ manual: true },
	);

	const fetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						q      : search || undefined,
						status : 'active',
					},
					page,
				},
			});
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [page, search, trigger]);

	useEffect(() => {
		fetch();
	}, [fetch, search]);

	const columns = getColumns();

	return {
		search,
		setSearch,
		page,
		setPage,
		data,
		loading,
		columns,
	};
};

export default useEmployeeDetails;
