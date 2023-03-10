/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useGetRevenueAnalysis = (headerFilters) => {
	const { entity_code = [] } = headerFilters;

	const [params, setParams] = useState();
	const [revenueAnalysis, setRevenueAnalysis] = useState(null);
	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_invoiced_revenue_analysis_breakdown',
		method : 'GET',
		scope,
	}, { manual: false });

	const fetchRevenueAnalysisData = async () => {
		try {
			const res = await trigger({
				params: {
					...params,
					entity_code: entity_code.length > 0 ? entity_code : undefined,
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			if (res?.data?.invoiced_revenue) {
				setRevenueAnalysis(res?.data);
			}

			return data;
		} catch (err) {
			return false;
		}
	};

	useEffect(() => {
		if (params) fetchRevenueAnalysisData();
	}, [params, JSON.stringify(entity_code)]);

	return {
		revenueAnalysisLoading: loading,
		revenueAnalysis,
		params,
		setParams,
	};
};

export default useGetRevenueAnalysis;
