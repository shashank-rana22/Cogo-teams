import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback } from 'react';

const useFetchSchedules = () => {
	const { general } = useSelector((state) => state);
	const [filters, setFilters] = useState({});
	const [schedules, setSchedules] = useState({});

	const [currentPage, setCurrentPage] = useState(GLOBAL_CONSTANTS.one);

	const prepareFilters = () => { };

	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_air_schedule_subscription',
	}, { manual: true });

	const fetchSchedules = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						organization_branch_id : general?.query?.branch_id,
						...prepareFilters(filters, schedules?.filter_data ?? {}),
						status                 : 'active',
					},
					page: currentPage,
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setSchedules(data);
		} catch (err) {
			console.error('Unable to fetch schedules. Please try again.');
		}
	}, [currentPage, filters, general?.query?.branch_id, schedules?.filter_data, trigger]);

	useEffect(() => {
		fetchSchedules();
	}, [filters, currentPage, fetchSchedules]);

	return {
		loading,
		filters,
		setFilters,
		fetchSchedules,
		schedules,
		setCurrentPage,
		currentPage,

	};
};

export default useFetchSchedules;
