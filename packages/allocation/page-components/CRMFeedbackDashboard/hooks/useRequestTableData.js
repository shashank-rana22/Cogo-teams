import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useCallback } from 'react';

const useRequestTableData = () => {
	const router = useRouter();

	const [filters, setFilters] = useState({});

	const [params, setParams] = useState({
		page_limit   : 10,
		page         : 1,
		is_dashboard : true,
		filters      : {},
	});

	const [{ data = [], loading = false }] = useAllocationRequest({
		url     : '/feedback_requests',
		method  : 'get',
		authkey : 'get_allocation_feedback_requests',
		params,
	}, { manual: false });

	const onChangeParams = (values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	};

	const onChangeFilters = useCallback(
		(values = {}) => {
			setFilters((previousState) => ({
				...previousState,
				...values,
			}));
			setParams((previousState) => ({
				...previousState,
				filters: {
					...previousState.filters,
					...values,
				},
			}));
		},
		[setFilters, setParams],
	);

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
