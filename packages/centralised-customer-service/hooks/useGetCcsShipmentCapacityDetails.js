import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const DEFAULT_PAGE = 1;

const useGetCcsShipmentCapacityDetails = () => {
	const router = useRouter();
	const { id } = router.query;

	const [filters, setFilters] = useState({});

	const [page, setPage] = useState(DEFAULT_PAGE);

	const [{ loading, data }, trigger] = useAllocationRequest({
		url     : 'ccs_shipment_capacity_details',
		method  : 'GET',
		authkey : 'get_allocation_ccs_shipment_capacity_details',
	}, { manual: true });

	const fetchList = useCallback(() => {
		try {
			trigger({
				...(id ? {
					params: {
						filters: {
							id,
						},
					},
				} : {
					params: {
						page,
						filters: {
							...filters,
							status: ['draft', 'active'],
						},

					},
				}),

			});
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	}, [trigger, id, filters, page]);

	useEffect(() => {
		if (id) fetchList();
	}, [fetchList, id, page, filters]);

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

export default useGetCcsShipmentCapacityDetails;
