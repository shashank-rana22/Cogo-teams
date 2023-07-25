import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const getPayload = ({ filters }) => {
	const { employee_ids = [], ...rest } = filters || [];

	return {
		filters: {
			employee_ids,
			...rest,
		},
	};
};

function useGetUnassignedEmployee() {
	const [filters, setFilters] = useState({});
	const [filtersFields, setFiltersFields] = useState({});
	const [showKRACalculationTable, setShowKRACalculationTable] = useState(false);

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_unassigned_employees',
		method : 'GET',
	}, { manual: true });

	const getUnassignedEmployee = useCallback(() => {
		const payload = getPayload({ filters });

		try {
			trigger({
				params: payload,
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [trigger, filters]);

	useEffect(() => {
		getUnassignedEmployee();
	}, [getUnassignedEmployee]);

	return {
		data,
		loading,
		filters,
		setFilters,
		getUnassignedEmployee,
		showKRACalculationTable,
		setShowKRACalculationTable,
		filtersFields,
		setFiltersFields,
	};
}

export default useGetUnassignedEmployee;