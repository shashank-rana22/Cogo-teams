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

	const validParams = {};
	Object.keys(params).forEach((key) => { if (params[key]) { validParams[key] = params[key]; } });

	const [{ data: feedbackData = {}, loading = false }] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_list_user_feedbacks',
		params : { ...validParams },
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	useEffect(() => {
		setParams((pv) => ({
			...pv,
			Page : 1,
			Q    : searchValue || undefined,
		}));
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
