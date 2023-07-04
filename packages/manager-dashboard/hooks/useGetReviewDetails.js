import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback } from 'react';

import { checkObjectValues } from '../utils/checkObjectValues';

const useGetRatingReviewDetails = ({ level, ratingCycle }) => {
	const [filters, setFilters] = useState({});
	const { user }	 = useSelector((state) => state?.profile || {});

	const { id } = user || {};

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_rating_review_details',
		method : 'GET',
	}, { manual: true });

	const formattedDate = (item) => formatDate({
		date       : item,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	});

	const isReportingManager = checkObjectValues(filters);

	const fetchRatingReviewDetails = useCallback(async () => {
		const splitRatingCycle = ratingCycle?.split('_');
		const [firstDate, lastDate] = splitRatingCycle || [];

		try {
			await trigger({
				params: {
					manager_id : id,
					label      : isReportingManager && level === 'vertical_head'
						? 'reporting_manager_wise' : 'all_employee',
					level,
					end_date   : formattedDate(lastDate),
					start_date : formattedDate(firstDate),
					filters    : { ...filters },
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [level, trigger, filters, ratingCycle, isReportingManager, id]);

	useEffect(() => {
		if (level) {
			fetchRatingReviewDetails();
		}
	}, [fetchRatingReviewDetails, level]);

	return { data, loading, filters, setFilters, isReportingManager };
};

export default useGetRatingReviewDetails;
