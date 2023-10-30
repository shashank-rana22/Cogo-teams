import { useDebounceQuery } from '@cogoport/forms';
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
	const { query = '', debounceQuery } = useDebounceQuery();

	const { page = 1, serial_id = '', ...restFilters } = filters || {};
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
					serial_id: query,
				},
				...(defaultParams || {}),
			},
		},
		{ manual: true },
	);

	const getListRules = useCallback(async () => {
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
		getListRules();
	}, [getListRules]);

	useEffect(() => {
		debounceQuery(serial_id);
	}, [serial_id, debounceQuery]);

	return {
		data,
		loading,
		filters,
		setFilters,
		getListRules,
	};
};

export default useListPromotionRules;
