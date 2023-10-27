import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const SORT_BY = 'created_at';
const SORT_TYPE = 'asc';
const PAGE_LIMIT = 10;

function useListHandlingFees({
	defaultFilters = {},
	defaultParams = {},
}) {
	const [data, setData] = useState({});

	const [filters, setFilters] = useState({});

	const {
		listType: status = '',
		activeService: service_type = '',
	} = defaultFilters || {};

	const { page = 1, ...restFilters } = filters || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/list_handling_fee_configurations',
		method : 'GET',
		params : {
			filters: {
				service_type,
				status,
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

	const listHandlingFees = useCallback(async () => {
		try {
			const res = await trigger();
			if (res?.data) {
				setData(res.data);
			}
		} catch (err) {
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		listHandlingFees();
	}, [listHandlingFees, filters]);

	return {
		filters,
		setFilters,
		data,
		loading,
	};
}

export default useListHandlingFees;
