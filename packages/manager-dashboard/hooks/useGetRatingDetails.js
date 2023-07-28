import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

import { formattedDate } from '../utils/formattedDate';

const useGetRatingDetails = (ratingCycle) => {
	const { user }	 = useSelector((state) => state?.profile || {});
	const { id } = user || {};

	const splitRatingCycle = ratingCycle?.split('_');
	const [firstDate, lastDate] = splitRatingCycle || [];

	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_employee_rating_count',
		method : 'GET',
	}, { manual: true });

	const getRatingDetails = useCallback(
		() => {
			trigger({
				params: {
					manager_user_id : id,
					end_date        : formattedDate(lastDate),
					start_date      : formattedDate(firstDate),
				},
			});
		},
		[firstDate, lastDate, trigger, id],
	);

	useEffect(() => {
		if (!isEmpty(ratingCycle)) {
			getRatingDetails();
		}
	}, [getRatingDetails, ratingCycle]);

	return { data, loading };
};

export default useGetRatingDetails;
