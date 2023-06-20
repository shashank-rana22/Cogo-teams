import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useGetkrasAssigned({ filters }) {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/get_kras_assigned',
			method : 'GET',
		},
		{ manual: true },
	);

	const getkrasAssigned = useCallback(async () => {
		const { employee_ids = [], ...rest } = filters || [];
		try {
			await trigger({
				params: {
					employee_ids,
					...rest,
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
	};
}

export default useGetkrasAssigned;
