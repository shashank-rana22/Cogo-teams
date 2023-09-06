import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetLeaveRequestListing = () => {
	const [filters, setFilters] = useState({
		page_limit : 20,
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
		try {
			getLeaveRequestListing();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	}, [getLeaveRequestListing]);
	return { loading, data, filters, setFilters, refetchLeaves: getLeaveRequestListing };
};

export default useGetLeaveRequestListing;
