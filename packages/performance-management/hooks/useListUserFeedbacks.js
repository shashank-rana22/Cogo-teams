import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getDefaultFeedbackMonth from '../utils/getDefaultYearMonth';

const useListUserFeedbacks = ({
	searchValue = '',
	month = '', year = '',
	userId = '',
	managerId = '',
	rating_required = '',
}) => {
	const { feedbackMonth, feedbackYear } = getDefaultFeedbackMonth();
	const [params, setParams] = useState({
		ManagerID    : managerId || undefined,
		UserID       : userId || undefined,
		Month        : month || feedbackMonth,
		Year         : year || feedbackYear,
		RatingExists : rating_required || undefined,
		Page         : 1,
		PageLimit    : 10,
	});

	const [{ data: feedbackData = {}, loading = false }] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_list_user_feedbacks',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	useEffect(() => {
		setParams({
			...params,
			Page : 1,
			Q    : searchValue || undefined,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return {
		params,
		setParams,
		feedbackData,
		loading,
		setPage,
	};
};

export default useListUserFeedbacks;
