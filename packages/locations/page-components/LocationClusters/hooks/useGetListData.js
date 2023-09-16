import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetListData = ({ globalFilters = {}, searchQuery = '' }) => {
	const [locationData, setLocationData] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : '/list_location_clusters',
		method : 'GET',

	}, { manual: true });

	const getLocationData = async () => {
		const { page = 1 } = globalFilters;
		try {
			const res = await trigger({
				params: {
					page,
					filters: {
						q      : searchQuery || undefined,
						status : 'active',
					},
				},
			});
			if (!res.hasError) {
				setLocationData(res?.data);
			}
			return res;
		} catch (error) {
			return false;
		}
	};
	return {
		listData: locationData,
		getLocationData,
		loading,
	};
};
export default useGetListData;
