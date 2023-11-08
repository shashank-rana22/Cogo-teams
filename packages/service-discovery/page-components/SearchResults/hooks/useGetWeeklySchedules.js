import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetWeeklySchedules = ({ filters }) => {
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

			await trigger({
				params: {
					spot_search_id,
					filters: finalFilters,
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [filters, spot_search_id, trigger]);

	useEffect(() => {
		getSchedules();
	}, [getSchedules]);

	return { loading, schedules };
};
export default useGetWeeklySchedules;
