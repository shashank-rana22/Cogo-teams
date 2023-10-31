import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const PAGE_LIMIT = 10;

function useListHandlingFees({
	defaultFilters = {},
	defaultParams = {},
}) {
	const [data, setData] = useState({});

	const [filters, setFilters] = useState({});
	const [page, setPage] = useState(1);

	const {
		listType: status = '',
		activeService: service_type = '',
	} = defaultFilters || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/list_handling_fee_configurations',
		method : 'GET',
		params : {
			filters: {
				service_type,
				status,
				...(defaultFilters || {}),
				...filters,
			},
			page_limit               : PAGE_LIMIT,
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
		page,
		setPage,
	};
}

export default useListHandlingFees;
