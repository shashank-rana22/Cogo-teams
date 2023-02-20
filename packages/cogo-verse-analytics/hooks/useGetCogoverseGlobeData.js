import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetCogoverseGlobeData = ({ country = {}, circleTab = '' }) => {
	console.log('circleTab', circleTab);
	console.log('country', country);
	const [pointsList, setPointsList] = useState({
		fullResponse: {},
	});

	const [{ error, loading }, refetch] = useRequest({
		url    : '/get_cogoverse_globe_data',
		method : 'GET',
		params : {

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
	}, []);

	return {
		globeLoading  : loading,
		pointsList,
		error,
		refetchPoints : refetch,
	};
};

export default useGetCogoverseGlobeData;
