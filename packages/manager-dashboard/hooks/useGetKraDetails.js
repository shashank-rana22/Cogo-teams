import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect } from 'react';

import { formattedDate } from '../utils/formattedDate';

function useEmployeeKraDetails({ employeeId, ratingCycle }) {
	const { t } = useTranslation(['managerDashboard']);

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/list_employee_kra_details',
		method : 'GET',
	}, { manual: true });

	const employeeKraDetails = useCallback(() => {
		const splitRatingCycle = ratingCycle?.split('_');
		const [firstDate, lastDate] = splitRatingCycle || [];

		try {
			trigger({
				params: {
					employee_id : employeeId,
					start_date  : formattedDate(firstDate),
					end_date    : formattedDate(lastDate),
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data)
				|| t('managerDashboard:something_went_wrong_toast_error'));
			}
		}
	}, [employeeId, trigger, ratingCycle, t]);

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
