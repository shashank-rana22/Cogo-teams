/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useGetAccruedRevenue = (headerFilters) => {
	const { entity_code = [] } = headerFilters || {};
	const scope = useSelector(({ general }) => general.scope);
	const [revenueAnalysis, setRevenueAnalysis] = useState(null);
	const [params, setParams] = useState();

	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_accrual_revenue_breakdown',
		method : 'GET',
		scope,
	}, { manual: false });

	const fetchRevenueData = async () => {
		try {
			const res = await trigger({
				params: {
					...params,
					entity_code: entity_code.length > 0 ? entity_code : undefined,
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			if (res?.data?.accrual_revenue) {
				setRevenueAnalysis(res?.data);
			}

			return data;
		} catch (err) {
			return false;
		}
	};

	useEffect(() => {
		if (params) fetchRevenueData();
	}, [params, JSON.stringify(entity_code)]);

	return {
		loading,
		accruedRevenue: revenueAnalysis,
		params,
		setParams,
	};
};

export default useGetAccruedRevenue;
