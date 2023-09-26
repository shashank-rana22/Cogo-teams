import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useMonthlyRating = ({ level }) => {
	const [page, setPage] = useState(GLOBAL_CONSTANTS.one);
	const [search, setSearch] = useState('');
	const [location, setLocation] = useState('');
	const [department, setDepartment] = useState('');

	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_ratings',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						level,				// TODO
						page,
						filters: {
							department_id   : department || undefined,
							office_location : location || undefined,
							q               : search || undefined,
						},
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[department, level, location, page, search, trigger],
	);

	useEffect(() => {
		fetch();
	}, [fetch, page, search, location, department]);

	const { list, ...paginationData } = data || {};

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

	};
};

export default useMonthlyRating;
