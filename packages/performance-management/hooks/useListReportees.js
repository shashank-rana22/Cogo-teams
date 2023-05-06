import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getDefaultFeedbackMonth from '../utils/getDefaultYearMonth';

const useListReportees = ({
	searchValue = '',
}) => {
	const { feedbackMonth, feedbackYear } = getDefaultFeedbackMonth();
	const [params, setParams] = useState({
		Page                 : 1,
		PageLimit            : 20,
		FeedbackDataRequired : true,
		Year                 : feedbackYear,
		Month                : feedbackMonth,
	});

	const validParams = {};
	Object.keys(params).forEach((key) => { if (params[key]) { validParams[key] = params[key]; } });

	const [{ data: feedbackData = {}, loading = false }, trigger] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_list_reportees',
		params : { ...validParams },
	}, { manual: false });

	const fetchReportees = async () => {
		try {
			await trigger({ params });
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};
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
		fetchReportees,
	};
};

export default useListReportees;
