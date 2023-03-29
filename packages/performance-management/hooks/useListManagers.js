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

	const [{ data: feedbackData = {}, loading = false }] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_list_managers',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	// eslint-disable-next-line react-hooks/exhaustive-deps

	useEffect(() => {
		setParams({
			...params,
			Q    : searchValue || undefined,
			Page : 1,
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

export default useListManagers;
