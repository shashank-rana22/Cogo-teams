import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import { formattedDate } from '../../../common/formattedDate';

const getPayload = ({ show, selectCycle }) => {
	const { end_date, start_date } = selectCycle || {};

	return {
		employee_id : show,
		start_date  : formattedDate(start_date),
		end_date    : formattedDate(end_date),
	};
};

function useEmployeeKraDetails({ show, selectCycle }) {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/list_employee_kra_details',
		method : 'GET',
	}, { manual: true });

	const employeeKraDetails = useCallback(() => {
		const params = getPayload({ show, selectCycle });

		try {
			trigger({
				params,
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [selectCycle, show, trigger]);

	useEffect(() => {
		employeeKraDetails();
	}, [employeeKraDetails]);

	return {
		data,
		loading,
		employeeKraDetails,
	};
}

export default useEmployeeKraDetails;
