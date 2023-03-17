/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useGetAccruedRevenue = (headerFilters) => {
	const { entity_code = [] } = headerFilters || {};
	const scope = useSelector(({ general }) => general.scope);
	const [params, setParams] = useState();

	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_accrual_revenue_breakdown',
		method : 'GET',
		scope,
	}, { manual: false });

	const fetchRevenueData = async () => {
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
		if (params) fetchRevenueData();
	}, [params, JSON.stringify(entity_code)]);

	return {
		loading,
		accruedRevenue: data,
		params,
		setParams,
	};
};

export default useGetAccruedRevenue;
