import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetEmployeeCollections = ({ isManager, request_type, isOpen }) => {
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
					view_requests_type : isManager ? 'view_employee_requests' : 'view_my_requests',
					required_listing   : request_type,
					...filters,
				},
			});
		},
		[filters, isManager, request_type, trigger],
	);

	useEffect(() => {
		if (request_type && isOpen) {
			getEmployeeRequestCollections();
		}
	}, [getEmployeeRequestCollections, isOpen, request_type]);

	return { loading, data, setFilters };
};

export default useGetEmployeeCollections;
