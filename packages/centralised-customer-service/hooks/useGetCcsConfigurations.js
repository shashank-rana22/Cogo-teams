import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useCallback } from 'react';

const DEFAULT_PAGE = 1;

const useGetCcsConfigurations = () => {
	const router = useRouter();
	const { id } = router.query;

	const [filters, setFilters] = useState({});

	const [page, setPage] = useState(DEFAULT_PAGE);

	const [{ loading, data }, trigger] = useAllocationRequest({
		url     : 'ccs_configurations',
		method  : 'GET',
		authkey : 'get_allocation_ccs_configurations',
	}, { manual: true });

	const fetchList = useCallback(() => {
		try {
			const params = {
				...(id ? {
					filters: {
						id,
					},
				} : {
					page,
					filters: {
						...filters,
						status: 'active',
					},
				}),

			};

			trigger({ params });
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	}, [trigger, id, page, filters]);

	const { list = [], ...pageData } = data || {};

	return {
		fetchList,
		loading,
		list,
		pageData,
		page,
		setPage,
		filters,
		setFilters,
	};
};

export default useGetCcsConfigurations;
