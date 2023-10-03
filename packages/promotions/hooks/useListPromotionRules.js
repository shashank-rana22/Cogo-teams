import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const PAGE_LIMIT = 10;

const useListPromotionRules = ({
	defaultFilters = {},
	defaultParams = {},
}) => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});

	const { page = 1, ...restFilters } = filters || {};
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_promotion_rules',
			method : 'GET',
			params : {
				page,
				page_limit : PAGE_LIMIT,
				filters    : {
					...(defaultFilters || {}),
					...restFilters,
				},
				...(defaultParams || {}),
			},
		},
		{ manual: true },
	);

	const listPromotionRule = useCallback(async () => {
		try {
			const res = await trigger();
			if (res?.data) {
				setData(res.data);
			}
		} catch (err) {
			toastApiError(err);
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		listPromotionRule();
	}, [listPromotionRule, filters]);

	return {
		data,
		loading,
		filters,
		setFilters,
		listPromotionRule,
	};
};

export default useListPromotionRules;
