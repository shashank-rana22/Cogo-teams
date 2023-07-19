import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getPayload = ({ filters }) => {
	const { employee_ids = [], ...rest } = filters || [];

	return {
		filters: {
			employee_ids,
			...rest,
		},
	};
};

function useGetEmployeesWithLowWeightage({ filters }) {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_employees_with_low_weightage',
		method : 'GET',
	}, { manual: true });

	const getEmployeesWithLowWeightage = useCallback(() => {
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
		getEmployeesWithLowWeightage();
	}, [getEmployeesWithLowWeightage]);

	return {
		data,
		loading,
		getEmployeesWithLowWeightage,
	};
}

export default useGetEmployeesWithLowWeightage;
