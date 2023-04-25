import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const INITIAL_ARRAY = [];

const useGetRevenueAnalysis = (headerFilters) => {
	const { entity_code = INITIAL_ARRAY } = headerFilters;

	const [params, setParams] = useState();
	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_invoiced_revenue_analysis_breakdown',
		method : 'GET',
		scope,
	}, { manual: true });

	const fetchRevenueAnalysisData = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						...params,
						entity_code: entity_code?.length > 0 ? entity_code : undefined,
					},
				});
			} catch (err) {
				console.log(err, 'err');
			}
		},
		[entity_code, params, trigger],
	);

	useEffect(() => {
		if (params) fetchRevenueAnalysisData();
	}, [fetchRevenueAnalysisData, params]);

	return {
		revenueAnalysisLoading : loading,
		revenueAnalysis        : data,
		params,
		setParams,
	};
};

export default useGetRevenueAnalysis;
