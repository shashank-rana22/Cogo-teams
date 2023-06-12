import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useMemo } from 'react';

function useGetEmployeeDetails({ company_policy_data_required = false }) {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const params = useMemo(() => ({
		user_id                 : userId,
		offer_letter_required   : true,
		progress_stats_required : true,
		company_policy_data_required,
	}), [company_policy_data_required, userId]);

	const [{ loading = false, data = {} }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_details',
		params,
	}, { manual: false });

	const getEmployeeDetails = useCallback(() => {
		try {
			trigger({
				params,
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [params, trigger]);

	return {
		loading,
		data,
		getEmployeeDetails,
	};
}

export default useGetEmployeeDetails;
