import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetLeaveRequestListing = () => {
	const [filters, setFilters] = useState({
		page_limit : 4,
		page       : 1,
	});

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_leave_applications',
	}, { manual: true });

	const getLeaveRequestListing = useCallback(
		() => {
			const { page_limit, page } = filters;
			trigger({
				params: {
					page_limit,
					page,
				},
			});
		},
		[filters, trigger],
	);

	useEffect(() => {
		getLeaveRequestListing();
	}, [getLeaveRequestListing]);
	return { loading, data, filters, setFilters };
};

export default useGetLeaveRequestListing;
