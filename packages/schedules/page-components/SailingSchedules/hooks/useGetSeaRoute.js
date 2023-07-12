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
		} catch (err) {
			console.error(err?.error?.message);
		}
	};

	useEffect(() => {
		if (origin_port_id && destination_port_id) {
			getOceanRoute();
		}
	}, [origin_port_id, destination_port_id]);

	return {
		data: data?.the_geom,
		loading,
	};
};

export default useGetSeaRoute;
