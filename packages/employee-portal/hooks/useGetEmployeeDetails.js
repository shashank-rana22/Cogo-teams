import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

function useGetEmployeeDetails({ company_policy_data_required = false }) {
	const { user } = useSelector((state) => state?.profile);
	const { id:userId } = user || {};

	const [{ loading = false, data = {} }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_details',
	}, { manual: true });

	const getEmployeeDetails = useCallback(() => {
		try {
			trigger({
				params: {

					user_id                 : userId,
					offer_letter_required   : true,
					progress_stats_required : true,
					company_policy_data_required,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [company_policy_data_required, trigger, userId]);

	useEffect(() => {
		getEmployeeDetails();
	}, [getEmployeeDetails]);

	return {
		loading,
		data,
		getEmployeeDetails,
	};
}

export default useGetEmployeeDetails;
