import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetCogoverseGlobeData = ({ country = {}, circleTab = '', date = {} }) => {
	console.log('country', country);
	const [globeData, setGlobeData] = useState({
		fullResponse: {},
	});
	const [{ error, loading }, trigger, refetch] = useRequest({
		url    : '/get_cogoverse_globe_data',
		method : 'GET',
		params : {
			mobile_country_code : country?.mobile_country_code || undefined,
			start_date          : date?.startDate || undefined,
			end_date            : date?.endDate || undefined,
			event               : circleTab || '',
		},
	}, { manual: true });

	useEffect(() => {
		trigger()
			.then((res) => {
				setGlobeData(() => ({
					fullResponse: res.data,
				}));
			})
			.catch(() => {
				setGlobeData(() => ({
					fullResponse : {},
					reverted     : 0,
				}));
			});
		// eslint-disable-next-line
	}, [circleTab,date]);

	return {
		globeLoading  : loading,
		globeData,
		error,
		refetchPoints : refetch,
	};
};

export default useGetCogoverseGlobeData;
