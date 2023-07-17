import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import { formattedDate } from '../../../common/formattedDate';

const MIN_RATING = 0;

const useUpdateEmployeeFinalRating = ({ data, selectCycle, setShow, fetchRatingReviewDetails }) => {
	const { end_date, start_date } = selectCycle || {};

	const [starRating, setStarRating] = useState(MIN_RATING);
	const [comments, setCommemts] = useState('');

	const [{ loading }, trigger] = useRequest({
		url    : '/update_employee_final_rating',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeFinalRating = async () => {
		if (starRating === MIN_RATING) {
			Toast.error('Rating is required');
			return;
		}
		if (!comments) {
			Toast.error('Comments is required');
			return;
		}

		try {
			await trigger({
				data: {
					employee_id         : data?.employee_details?.employee_id,
					manager_id          : data?.employee_details?.manager_id,
					kra_rating_assigned : starRating,
					comments,
					start_date          : formattedDate(start_date),
					end_date            : formattedDate(end_date),
				},
			});
			Toast.success('Sucessfully Update Rating');
			setShow(false);
			fetchRatingReviewDetails();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		updateEmployeeFinalRating,
		loading,
		starRating,
		setStarRating,
		comments,
		setCommemts,
	};
};

export default useUpdateEmployeeFinalRating;
