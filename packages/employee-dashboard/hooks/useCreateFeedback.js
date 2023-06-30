// create_employee_feedback

// get_employee_dashboard_details

import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCreateFeedback() {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const [{ loading, data = {} }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_employee_feedback',
	}, { manual: true });

	const createFeedback = (values) => {
		try {
			trigger({
				data: {
					...values,
					start_date        : '2023-06-21',
					end_date          : '2023-07-20',
					performed_by_id   : userId,
					performed_by_type : 'user',
					employee_user_id  : userId,
				},
			});
		} catch (error) {
			console.log('err', error);
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	// const getEmployeeDetails = useCallback(() => {
	// 	try {
	// 		trigger();
	// 	} catch (err) {
	// 		Toast.error(getApiErrorString(err.response?.data));
	// 	}
	// }, [trigger]);

	// useEffect(() => {
	// 	getEmployeeDetails();
	// }, [getEmployeeDetails]);

	return {
		loading,
		data,
		createFeedback,
	};
}

export default useCreateFeedback;
