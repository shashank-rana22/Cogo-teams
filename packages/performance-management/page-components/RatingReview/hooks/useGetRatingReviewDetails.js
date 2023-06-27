import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetRatingReviewDetails = ({ selectValue, level }) => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_rating_review_details',
		method : 'GET',
	}, { manual: true });

	const fetchRatingReviewDetails = useCallback(() => {
		try {
			trigger({
				params: {
					manager_id : '2fac2a22-dd10-49db-8a5e-ca6188d63cf8',
					label      : selectValue,
					level,
					end_date   : '2023-07-21',
					start_date : '2023-06-21',

				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [level, selectValue, trigger]);

	useEffect(() => {
		if (selectValue) {
			fetchRatingReviewDetails();
		}
	}, [fetchRatingReviewDetails, selectValue]);

	return { data, loading };
};

export default useGetRatingReviewDetails;
