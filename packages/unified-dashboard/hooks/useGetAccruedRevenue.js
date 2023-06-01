import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const INITIAL_ARRAY = [];

const useGetAccruedRevenue = (headerFilters) => {
	const { entity_code = INITIAL_ARRAY } = headerFilters || {};
	const scope = useSelector(({ general }) => general.scope);
	const [params, setParams] = useState();

	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_accrual_revenue_breakdown',
		method : 'GET',
		scope,
	}, { manual: true });

	const fetchRevenueData = useCallback(
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
		if (params) fetchRevenueData();
	}, [fetchRevenueData, params]);

	return {
		loading,
		accruedRevenue: data,
		params,
		setParams,
	};
};

export default useGetAccruedRevenue;
