import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetHolidayList = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_holiday_date',
	}, { manual: true });

	const getHolidayList = useCallback(
		() => {
			trigger({
				params: {
					yearly: true,
				},
			});
		},
		[trigger],
	);

	useEffect(() => {
		try {
			getHolidayList();
		} catch (error) {
			console.log('err', error);
		}
	}, [getHolidayList]);

	return { loading, data };
};

export default useGetHolidayList;
