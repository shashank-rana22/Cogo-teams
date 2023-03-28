import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useRequestTableData = () => {
	const router = useRouter();

	const [filters, setFilters] = useState({});

	const [params, setParams] = useState({
		page_limit   : 10,
		page         : 1,
		is_dashboard : true,
		filters,
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/feedback_requests',
		method  : 'get',
		authkey : 'get_allocation_feedback_requests',
		params,
	}, { manual: true });

	const onChangeParams = (values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	};

	useEffect(() => {
		trigger({
			params: {
				...params,
				filters: { ...params?.filters, ...filters },
			},
		});
	}, [params, filters, trigger]);

	const onChangeFilters = (values) => {
		setFilters((previousState) => ({
			...filters,
			...previousState,
			...values,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		router,
		data: list,
		loading,
		setParams,
		paginationData,
		filters,
		onChangeFilters,
		onChangeParams,
	};
};

export default useRequestTableData;
