import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const isAlreadyApplied = (filters, data) => {
	if (!filters.departure_after || !filters.departure_before) {
		return false;
	}
	const key = `${filters.departure_after} ${filters.departure_before}`;
	return data.find((item) => `${item.start_date} ${item.end_date}` === key);
};

const useGetWeeklySchedules = ({ filters = {}, setSelectedWeek = () => {} }) => {
	const { general: { query = {} } } = useSelector((state) => state);
	const { spot_search_id = '' } = query;

	const [{ loading = false, data:schedules = [] }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_spot_search_schedule_weeks',
	}, { manual: true });

	const getSchedules = useCallback(async () => {
		try {
			if (!spot_search_id) return;

			let finalFilters = {};

			Object.keys(filters).forEach((key) => {
				finalFilters = {
					...finalFilters,
					[key]: filters[key] || undefined,
				};
			});

			const res = await trigger({
				params: {
					spot_search_id,
					filters: finalFilters,
				},
			});
			const { data = {} } = res;

			const alreadyPresent = isAlreadyApplied(filters, data);
			if (alreadyPresent) setSelectedWeek(alreadyPresent);
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [filters, setSelectedWeek, spot_search_id, trigger]);

	useEffect(() => {
		getSchedules();
	}, [getSchedules]);

	return { loading, schedules };
};
export default useGetWeeklySchedules;
