import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const PAGE_LIMIT = 10;

const useGetListPromotionRule = ({
	defaultFilters = {},
	defaultParams = {},
}) => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});

	const { activeList: status = '', activeService: primary_service = '' } = defaultFilters || {};

	const { page = 1, ...restFilters } = filters || {};
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_promotion_rules',
			method : 'GET',
			params : {
				page,
				page_limit : PAGE_LIMIT,
				filters    : {
					primary_service,
					categories: ['business'],
					status,
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

	const refetch = () => {
		listPromotionRule();
	};

	return {
		data,
		loading,
		filters,
		setFilters,
		refetch,
	};
};

export default useGetListPromotionRule;
