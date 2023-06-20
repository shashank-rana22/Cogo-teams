import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useGetkrasAssigned() {
	const [filters, setFilters] = useState();

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/get_kras_assigned',
			method : 'GET',
		},
		{ manual: true },
	);

	const getkrasAssigned = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters,
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [trigger, filters]);

	useEffect(() => {
		getkrasAssigned();
	}, [getkrasAssigned]);

	return {
		data,
		loading,
		filters,
		setFilters,
		getkrasAssigned,
	};
}

export default useGetkrasAssigned;
