import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import { formattedDate } from '../../../common/formattedDate';

const MIN_RATING = 0;
const RATING_THRESHOLD = 1;

const getPayload = ({ data, starRating, comments, selectCycle }) => {
	const { end_date, start_date } = selectCycle || {};

	return {
		employee_id         : data?.employee_details?.employee_id,
		manager_id          : data?.employee_details?.manager_id,
		kra_rating_assigned : starRating,
		comments,
		start_date          : formattedDate(start_date),
		end_date            : formattedDate(end_date),
	};
};

const useUpdateEmployeeFinalRating = ({ data, selectCycle, setShow, fetchRatingReviewDetails }) => {
	const [starRating, setStarRating] = useState(MIN_RATING);
	const [comments, setCommemts] = useState('');

	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_employee_final_rating',
		method : 'POST',
	}, { manual: true });

	const { final_rating } = data || {};

	// const ratingCondition = (final_rating > MIN_RATING)
	// && (starRating > final_rating + RATING_THRESHOLD || starRating < final_rating - RATING_THRESHOLD);

	const updateEmployeeFinalRating = async () => {
		if (starRating === MIN_RATING) {
			Toast.error('Rating is required');
			return;
		}
		if (!comments) {
			Toast.error('Comments is required');
			return;
		}
		if (starRating > final_rating + RATING_THRESHOLD || starRating < final_rating - RATING_THRESHOLD) {
		// if (ratingCondition) {
			Toast.error("Can't change rating more or less than 1");
			return;
		}

		const payload = getPayload({ data, starRating, comments, selectCycle });

		try {
			await trigger({
				data: payload,
			});
			Toast.success('Sucessfully Update Rating');
			setShow(false);
			fetchRatingReviewDetails();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	useEffect(() => {
		setStarRating(final_rating);
	}, [final_rating]);

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
