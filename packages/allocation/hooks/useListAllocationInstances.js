import { useRequest } from '@cogoport/request';
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
					created_at_greater_than : `${dateRange?.startDate}` || undefined,
					created_at_less_than    : dateRange?.endDate || undefined,
				},
			}));

			console.log('dateRange :: ', dateRange);
		}
	}, [dateRange]);

	const [{ data, loading }] = useRequest({
		url    : '/list_allocation_instances',
		method : 'get',
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
