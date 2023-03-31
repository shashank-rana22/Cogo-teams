import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetCogoverseDashboard = ({ country = {}, date = {} }) => {
	const CountryMobileCode = country?.mobile_country_code || '';

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogoverse_dashboard',
		method : 'GET',
	}, { manual: true });

	const getCogoverseDashboard = async () => {
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
	};

	useEffect(() => {
		(async () => {
			await getCogoverseDashboard();
		})();
		// eslint-disable-next-line
	}, [date, CountryMobileCode]);

	return {
		statsLoading : loading,
		stats        : data,
	};
};

export default useGetCogoverseDashboard;
