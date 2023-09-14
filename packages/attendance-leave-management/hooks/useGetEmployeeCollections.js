import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

const useGetEmployeeCollections = ({ isManager, request_type, isOpen, searchQuery }) => {
	const [filters, setFilters] = useState({
		page_limit : 10,
		page       : 1,
	});

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_request_collection',
	}, { manual: true });

	const getEmployeeRequestCollections = useCallback(
		() => {
			trigger({
				params: {
					// performed_by_id    : '8696aa63-bfc4-4932-a711-8c0e0ab21498',
					view_requests_type : isManager ? 'view_employee_requests' : 'view_my_requests',
					required_listing   : request_type,
					...filters,
					q                  : searchQuery,
				},
			});
		},
		[filters, isManager, request_type, searchQuery, trigger],
	);

	useEffect(() => {
		if (!isEmpty(searchQuery) || (request_type && isOpen)) {
			getEmployeeRequestCollections();
		}
	}, [getEmployeeRequestCollections, isOpen, request_type, searchQuery]);

	return { loading, data, setFilters };
};

export default useGetEmployeeCollections;
