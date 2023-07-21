import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetWeeklySchedules = () => {
	const { general: { query = {} } } = useSelector((state) => state);
	const { spot_search_id = '' } = query;

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_spot_search_schedule_weeks',
	}, { manual: true });

	const getSchedules = useCallback(() => {
		try {
			trigger({
				params: { spot_search_id },
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [spot_search_id, trigger]);

	useEffect(() => {
		getSchedules();
	}, [getSchedules]);

	return { loading, schedules: data };
};
export default useGetWeeklySchedules;
