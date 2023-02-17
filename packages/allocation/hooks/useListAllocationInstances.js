import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useListAllocationInstances = ({ item = {} }) => {
	const [params, setParams] = useState({
		sort_by    : 'created_at',
		page       : 1,
		page_limit : 5,
		filters    : {
			allocation_id: item.allocation_schedule?.id,
		},
	});

	const [dateRange, setDateRange] = useState({});

	useEffect(() => {
		if (!isEmpty(dateRange)) {
			setParams((previousParams) => ({
				...(previousParams || {}),
				filters: {
					...((previousParams || {}).filters || {}),
					created_at_greater_than : dateRange?.startDate || undefined,
					created_at_less_than    : dateRange?.endDate || undefined,
				},
			}));
		}
	}, [dateRange]);

	const [{ data, loading }] = useAllocationRequest({
		url     : '/instances',
		method  : 'get',
		authkey : 'get_allocation_instances',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		listLoading: loading,
		list,
		paginationData,
		getNextPage,
		dateRange,
		setDateRange,
	};
};

export default useListAllocationInstances;
