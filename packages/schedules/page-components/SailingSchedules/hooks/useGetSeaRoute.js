import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetSeaRoute = ({ origin_port_id, destination_port_id }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/get_sea_route',
			method : 'GET',
		},
		{ manual: true },
	);

	const getOceanRoute = async () => {
		try {
			await trigger({
				params: {
					origin_port_id,
					destination_port_id,
					// enable_sea_route_processing: true,
				},
			});
		} catch (e) {
			if (e.response?.data) { Toast.error(getApiErrorString(e.response?.data)); }
		}
	};

	useEffect(() => {
		if (origin_port_id && destination_port_id) {
			getOceanRoute();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [origin_port_id, destination_port_id]);

	return {
		data: data?.the_geom,
		loading,
	};
};

export default useGetSeaRoute;
