import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

function useGetkrasAssigned({ filters }) {
	const [selectAccordian, setSelectAccordian] = useState();
	const [selectArrayAccordian, setSelectArrayAccordian] = useState([]);

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
					filters: {
						employee_ids,
						...rest,
					},
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
		if (!isEmpty(filters)) { getkrasAssigned(); }
	}, [getkrasAssigned, filters]);

	return {
		data,
		loading,
		getkrasAssigned,
		selectAccordian,
		setSelectAccordian,
		selectArrayAccordian,
		setSelectArrayAccordian,
	};
}

export default useGetkrasAssigned;
