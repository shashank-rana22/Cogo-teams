import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetControlledBooking = () => {
	const [filters, setFilters] = useState({
		page   : 1,
		status : 'pending_approval',
	});

	const { page, status, q } = filters;

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_checkouts',
		method : 'GET',
	}, { manual: true });

	const listControlledBooking = useCallback(() => {
		try {
			trigger({
				params: {
					filters: {
						primary_service: 'fcl_freight',

						// booking_status  : 'pending',
						// sort_by         : status === 'approved' ? 'updated_at' : undefined,
						q: q || undefined,
					},
					approval_data_required: true,

					page,
				},
			});
		} catch (err) {
			console.log(err, 'erro');
		}
	}, [page, q, status, trigger]);

	useEffect(() => {
		listControlledBooking();
	}, [listControlledBooking, filters]);

	return {
		data,
		loading,
		filters,
		setFilters,
		listControlledBooking,
	};
};

export default useGetControlledBooking;
