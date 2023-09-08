import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const SORT_BY = 'created_at';
const SORT_TYPE = 'asc';
// const PAGEINATION_DATA_REQD = true;
const PAGE_LIMIT = 10;

const useListConvenienceRateConfigurations = ({ defaultFilters = {}, defaultParams = {} }) => {
	const router = useRouter();
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});
	const { activeList, activeService } = defaultFilters || {};

	const { page = 1, ...restFilters } = filters || {};
	const [{ loading }, trigger] = useRequest({
		url    : '/list_convenience_rate_configurations',
		method : 'GET',
		params : {
			filters: {
				service_type : activeService,
				status       : activeList,
				...(defaultFilters || {}),
				...restFilters,
			},
			page_limit               : PAGE_LIMIT,
			sort_by                  : SORT_BY,
			sort_type                : SORT_TYPE,
			pagination_data_required : true,
			page,
			...(defaultParams || {}),
		},
	}, { manual: true });

	const listConvenienceRate = useCallback(async () => {
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
		listConvenienceRate();
	}, [listConvenienceRate, filters]);

	return {
		data,
		loading,
		filters,
		setFilters,
		router,
	};
};

export default useListConvenienceRateConfigurations;
