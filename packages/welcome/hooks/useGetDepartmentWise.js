import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetDepartmentWise = () => {
	const [filters, setFilters] = useState({ department_id: '' });

	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_department_wise_summary',
	}, { manual: false });

	const getDepartmentWise = useCallback(
		() => {
			const { department_id } = filters;
			try {
				trigger({
					params: {
						filters: {
							department_id,
						},
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger, filters],
	);

	useEffect(() => {
		getDepartmentWise();
	}, [getDepartmentWise]);

	return {
		loading,
		data,
		getDepartmentWise,
		setFilters,
		filters,
	};
};

export default useGetDepartmentWise;
