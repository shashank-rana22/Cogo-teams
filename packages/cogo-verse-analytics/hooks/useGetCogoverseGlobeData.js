import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetCogoverseGlobeData = ({ country = {}, circleTab = '', date = {} }) => {
	const CountryMobileCode = country?.mobile_country_code || '';

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogoverse_globe_data',
		method : 'GET',

	}, { manual: true });

	const getCogoverseGlobeData = async () => {
		try {
			await trigger({
				params: {
					mobile_country_code : CountryMobileCode || undefined,
					start_date          : date?.startDate || undefined,
					end_date            : date?.endDate || undefined,
					event               : circleTab || '',

				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	useEffect(() => {
		(async () => {
			await getCogoverseGlobeData();
		})();
		// eslint-disable-next-line
	}, [circleTab,date,CountryMobileCode]);

	return {
		globeLoading : loading,
		globeData    : data,

	};
};

export default useGetCogoverseGlobeData;
