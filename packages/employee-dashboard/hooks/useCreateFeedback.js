import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { formattedDate } from '../utils/formattedDate';

function useCreateFeedback(ratingCycle) {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const [{ loading, data = {} }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_employee_feedback',
	}, { manual: true });

	const createFeedback = (values) => {
		const splitRatingCycle = ratingCycle?.split('_');
		const [firstDate, lastDate] = splitRatingCycle || [];
		try {
			trigger({
				data: {
					...values,
					start_date        : formattedDate(firstDate),
					end_date          : formattedDate(lastDate),
					performed_by_id   : userId,
					performed_by_type : 'user',
					employee_user_id  : userId,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		data,
		createFeedback,
	};
}

export default useCreateFeedback;
