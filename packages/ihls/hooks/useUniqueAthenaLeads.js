import { useAthenaRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useUniqueAthenaLeads = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});

	const {
		page = 1,
		sort_by = 'id',
		sort_type = 'asc', ...restFilters
	} = filters || {};

	const [{ loading }, trigger] = useAthenaRequest({
		url    : '/athena/unique-athena-leads',
		method : 'post',
		data   : {
			filters: {
				...(defaultFilters || {}),
				...restFilters,
			},
			...(defaultParams || {}),
			sort_by,
			sort_type,
			page,
		},
	}, { manual: true });

	const fetchAthenaUniqueLeads = useCallback(async () => {
		try {
			const res = await trigger();
			if (res?.data) { setData(res?.data); }
		} catch (err) {
			toastApiError(err);
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		fetchAthenaUniqueLeads();
	}, [fetchAthenaUniqueLeads, filters]);

	return {
		data,
		loading,
		setFilters,
		filters,
		fetchAthenaUniqueLeads,
	};
};

export default useUniqueAthenaLeads;
