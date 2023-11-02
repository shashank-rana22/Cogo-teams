import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const useMonthlyRating = ({ props }) => {
	const [page, setPage] = useState(GLOBAL_CONSTANTS.one);
	const [search, setSearch] = useState('');
	const [location, setLocation] = useState('');
	const [department, setDepartment] = useState('');
	const [showUnrated, setShowUnrated] = useState(false);
	const [filter_year, setFilterYear] = useState(null);
	const [filter_month, setFilterMonth] = useState(null);

	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_ratings',
	}, { manual: true });

	const { list, cycle_month, cycle_year, ...paginationData } = data || {};

	const fetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						level: props?.activeTab === 'functional_manager'
							? 'functional_manager' : props?.user_role,
						page,
						page_limit : 30,
						month      : filter_month || months.indexOf(cycle_month) + 1,
						year       : filter_year || cycle_year,
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
		[cycle_month, cycle_year, department, filter_month,
			filter_year, location, page, props?.activeTab, props?.user_role, search, showUnrated, trigger],
	);

	useEffect(() => {
		fetch();
	}, [fetch, page, search, location, department, showUnrated]);

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
		cycle_month,
		cycle_year,
		filter_year,
		setFilterMonth,
		filter_month,
		setFilterYear,
	};
};

export default useMonthlyRating;
