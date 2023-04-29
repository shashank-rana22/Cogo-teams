import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getDefaultFeedbackMonth from '../utils/getDefaultYearMonth';

const useListManagers = ({
	searchValue = '',
}) => {
	const { feedbackMonth, feedbackYear } = getDefaultFeedbackMonth();

	const [params, setParams] = useState({
		Page      : 1,
		PageLimit : 20,
		Year      : feedbackYear,
		Month     : feedbackMonth,
	});

	const validParams = {};
	Object.keys(params).forEach((key) => { if (params[key]) { validParams[key] = params[key]; } });

	const [{ data: feedbackData = {}, loading = false }] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_list_managers',
		params : { ...validParams },
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	useEffect(() => {
		setParams((pv) => ({
			...pv,
			Q    : searchValue || undefined,
			Page : 1,
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

export default useListManagers;
