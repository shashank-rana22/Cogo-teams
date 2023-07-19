import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import { formattedDate } from '../../../common/formattedDate';

const getPayload = ({ selectCycle, selectValue, level, activeTab, manager_id }) => {
	const { end_date, start_date } = selectCycle || {};

	return {
		manager_id,
		label      : selectValue,
		level      : level === 'vertical_head' ? activeTab : level,
		end_date   : formattedDate(end_date),
		start_date : formattedDate(start_date),
	};
};

const useGetRatingReviewDetails = ({ selectValue, level, selectCycle, activeTab }) => {
	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_rating_review_details',
		method : 'GET',
	}, { manual: true });

	const fetchRatingReviewDetails = useCallback(() => {
		const payload = getPayload({ selectCycle, selectValue, level, activeTab, manager_id: user?.id });

		try {
			trigger({
				params: payload,
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [activeTab, level, selectCycle, selectValue, trigger, user?.id]);

	useEffect(() => {
		if (selectValue && selectCycle) {
			fetchRatingReviewDetails();
		}
	}, [fetchRatingReviewDetails, selectCycle, selectValue, activeTab]);

	return { data, loading, fetchRatingReviewDetails };
};

export default useGetRatingReviewDetails;
