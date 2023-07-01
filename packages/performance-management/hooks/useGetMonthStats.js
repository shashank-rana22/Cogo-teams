import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

import getDefaultFeedbackMonth from '../utils/getDefaultYearMonth';

const useGetMonthStats = () => {
	const { feedbackMonth, feedbackYear } = getDefaultFeedbackMonth();
	const [params, setParams] = useState({
		Page      : 1,
		PageLimit : 20,
		Year      : feedbackYear,
		Month     : feedbackMonth,
	});

	const [{ data = {}, loading = false }] = useIrisRequest({
		url    : 'get_iris_get_month_stats',
		method : 'get',
		params,
	}, { manual: false });

	const setPage = (p) => {
		setParams({ ...params, Page: p });
	};

	return { params, setParams, data, loading, setPage };
};

export default useGetMonthStats;
