import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import { formattedDate } from '../utils/formattedDate';

function useGetEmployeeDetails(ratingCycle) {
	const { user } = useSelector((state) => state?.profile);
	const [openRatingForm, setOpenRatingForm] = useState(false);
	const { id: userId } = user || {};

	const [{ loading, data = {} }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_dashboard_details',
	}, { manual: true });

	const getEmployeeDetails = useCallback(() => {
		const splitRatingCycle = ratingCycle?.split('_');
		const [firstDate, lastDate] = splitRatingCycle || [];

		try {
			trigger({
				params: {
					employee_user_id : userId,
					start_date       : formattedDate(firstDate),
					end_date         : formattedDate(lastDate),
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [ratingCycle, trigger, userId]);

	useEffect(() => {
		if (ratingCycle !== '') {
			getEmployeeDetails();
		}
	}, [getEmployeeDetails, ratingCycle]);

	useEffect(() => {
		if (data) {
			const { is_rating_published, current_month_feedback_given } = data || {};
			if (is_rating_published && !current_month_feedback_given) {
				setOpenRatingForm(true);
			}
		}
	}, [data]);

	return {
		loading,
		data,
		refetch: getEmployeeDetails,
		openRatingForm,
		setOpenRatingForm,
	};
}

export default useGetEmployeeDetails;
