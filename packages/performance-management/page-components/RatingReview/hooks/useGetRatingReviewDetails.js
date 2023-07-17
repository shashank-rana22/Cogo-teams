import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import { formattedDate } from '../../../common/formattedDate';

const useGetRatingReviewDetails = ({ selectValue, level, selectCycle, activeTab }) => {
	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const { end_date, start_date } = selectCycle || {};

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_rating_review_details',
		method : 'GET',
	}, { manual: true });

	const fetchRatingReviewDetails = useCallback(() => {
		try {
			trigger({
				params: {
					manager_id : user?.id,
					label      : selectValue,
					level      : level === 'vertical_head' ? activeTab : level,
					end_date   : formattedDate(end_date),
					start_date : formattedDate(start_date),

				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [activeTab, end_date, level, selectValue, start_date, trigger, user?.id]);

	useEffect(() => {
		if (selectValue && selectCycle) {
			fetchRatingReviewDetails();
		}
	}, [fetchRatingReviewDetails, selectCycle, selectValue, activeTab]);

	return { data, loading, fetchRatingReviewDetails };
};

export default useGetRatingReviewDetails;
