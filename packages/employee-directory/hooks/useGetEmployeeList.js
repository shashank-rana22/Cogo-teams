import { useDebounceQuery } from '@cogoport/forms';
import { useState, useEffect, useCallback } from 'react';

const useGetEmployeeList = () => {
	const [filters, setFilters] = useState({
		activeTab : 'regular',
		page      : 1,
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const getEmployeeList = useCallback(
		() => {
			console.log('filters', filters, query);
		},
		[filters, query],
	);

	useEffect(() => {
		getEmployeeList();
	}, [getEmployeeList]);

	return {
		setFilters, filters, debounceQuery,
	};
};

export default useGetEmployeeList;
