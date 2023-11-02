import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useMonthlyRating = ({ props }) => {
	const [page, setPage] = useState(GLOBAL_CONSTANTS.one);
	const [search, setSearch] = useState('');
	const [location, setLocation] = useState('');
	const [department, setDepartment] = useState('');
	const [showUnrated, setShowUnrated] = useState(false);
	const [value, setValue] = useState(null);

	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_ratings',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						level: props?.activeTab === 'functional_manager'
							? 'functional_manager' : props?.level,
						page,
						page_limit : 30,
						month      : value?.month,
						year       : value?.year,
						filters    : {
							department_id   : department || undefined,
							office_location : location || undefined,
							q               : search || undefined,
						},
						show_unrated_employees: showUnrated ? true : undefined,
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[department, location, page,
			props?.activeTab, props?.level, search, showUnrated, trigger, value?.month, value?.year],
	);

	useEffect(() => {
		fetch();
	}, [fetch, page, search, location, department, showUnrated]);

	const { list, cycle_month, ...paginationData } = data || {};

	return {
		list,
		loading,
		paginationData,
		page,
		setPage,
		search,
		setSearch,
		location,
		setLocation,
		department,
		setDepartment,
		showUnrated,
		setShowUnrated,
		refetch: fetch,
		value,
		setValue,
		cycle_month,
	};
};

export default useMonthlyRating;
