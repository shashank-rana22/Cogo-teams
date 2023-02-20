import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetCogoverseGlobeData = ({ country = {}, circleTab = '', date = {} }) => {
	const [pointsList, setPointsList] = useState({
		fullResponse: {},
	});

	const [{ error, loading }, refetch] = useRequest({
		url    : '/get_cogoverse_globe_data',
		method : 'GET',
		params : {
			mobile_country_code : country?.mobile_country_code || '',
			start_date          : date?.startDate || '',
			end_date            : date?.endDate || '',
			event               : circleTab || '',
		},
	}, { manual: true });

	useEffect(() => {
		refetch()
			.then((res) => {
				setPointsList(() => ({
					fullResponse: res.data,
				}));
			})
			.catch(() => {
				setPointsList(() => ({

					fullResponse : {},
					reverted     : 0,
				}));
			});
		// eslint-disable-next-line
	}, [date,circleTab,country]);

	return {
		globeLoading  : loading,
		pointsList,
		error,
		refetchPoints : refetch,
	};
};

export default useGetCogoverseGlobeData;
