/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useGetRevenueAnalysis = (headerFilters) => {
	const { entity_code = [] } = headerFilters;

	const [params, setParams] = useState();
	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_invoiced_revenue_analysis_breakdown',
		method : 'GET',
		scope,
	}, { manual: false });

	const fetchRevenueAnalysisData = async () => {
		try {
			await trigger({
				params: {
					...params,
					entity_code: entity_code.length > 0 ? entity_code : undefined,
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	};

	useEffect(() => {
		if (params) fetchRevenueAnalysisData();
	}, [params, JSON.stringify(entity_code)]);

	return {
		revenueAnalysisLoading : loading,
		revenueAnalysis        : data,
		params,
		setParams,
	};
};

export default useGetRevenueAnalysis;
