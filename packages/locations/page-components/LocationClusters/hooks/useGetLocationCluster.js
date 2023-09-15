import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetLocationCluster = ({ location_id = '' }) => {
	const [locationData, setLocationData] = useState({});
	const [{ loading }, trigger] = useRequest({
		url    : '/get_location_cluster',
		method : 'GET',
	}, { manual: true });

	const getLocationClusterData = async () => {
		const params = { id: location_id };
		try {
			const res = await trigger({ params });
			if (!res.hasError) {
				setLocationData(res?.data);
			}
			return res;
		} catch (error) {
			toastApiError(error);
			return false;
		}
	};
	return {
		data: locationData?.locations || [],
		loading,
		getLocationClusterData,
	};
};
export default useGetLocationCluster;
