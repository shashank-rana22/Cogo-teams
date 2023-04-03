import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCogoverseDashboard = ({ country = {}, date = {} }) => {
	const CountryMobileCode = country?.mobile_country_code || '';

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogoverse_dashboard',
		method : 'GET',
	}, { manual: true });

	const getCogoverseDashboard = useCallback(async () => {
		try {
			await trigger({
				params: {
					start_date : date?.startDate || undefined,
					end_date   : date?.endDate || undefined,

				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [date, trigger]);

	useEffect(() => {
		(async () => {
			await getCogoverseDashboard();
		})();
	}, [CountryMobileCode, getCogoverseDashboard]);

	return {
		statsLoading : true,
		stats        : data,
	};
};

export default useGetCogoverseDashboard;
