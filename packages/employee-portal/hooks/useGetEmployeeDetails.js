import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

function useGetEmployeeDetails({ id = '' }) {
	const { user } = useSelector((state) => state?.profile);
	const { id:userId } = user || {};

	const [{ loading = false, data = {} }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : 'get_employee_details',
	}, { manual: true });

	const getEmployeeDetails = useCallback(() => {
		try {
			trigger({
				params: {
					user_id               : userId,
					offer_letter_required : true,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [trigger, userId]);

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
