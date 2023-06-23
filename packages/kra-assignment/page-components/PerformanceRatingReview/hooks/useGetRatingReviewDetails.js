import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetRatingReviewDetails = ({ selectValue, level }) => {
	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_rating_review_details',
		method : 'GET',
	}, { manual: true });

	const fetchRatingReviewDetails = useCallback(() => {
		try {
			trigger({
				params: {
					manager_id : '17db9959-664d-4946-9b46-aba747998ee0',
					label      : selectValue,
					level,
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
