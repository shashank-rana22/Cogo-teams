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
	const [showUnrated, setShowUnrated] = useState(false);
	const [filters, setFilters] = useState({});
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
						month      : filters?.month || months.indexOf(cycle_month) + 1,
						year       : filters?.year || cycle_year,
						filters    : {
							q: search || undefined,
						},
						show_unrated_employees: showUnrated ? true : undefined,
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[cycle_month, cycle_year, filters?.month, filters?.year,
			page, props?.activeTab, props?.user_role, search, showUnrated, trigger],
	);

	useEffect(() => {
		fetch();
	}, [fetch, page, search, showUnrated]);

	useEffect(() => {
		setFilters({ year: cycle_year, month: months.indexOf(cycle_month) + 1 });
	}, [cycle_month, cycle_year]);

	return {
		list,
		loading,
		paginationData,
		page,
		setPage,
		search,
		setSearch,
		showUnrated,
		setShowUnrated,
		refetch: fetch,
		cycle_month,
		cycle_year,
		setFilters,
		filters,
	};
};

export default useMonthlyRating;
