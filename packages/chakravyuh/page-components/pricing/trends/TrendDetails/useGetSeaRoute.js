import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetSeaRoute = ({ trend }) => {
	const [filters, setFilters] = useState({});
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_sea_route',
		method : 'GET',
		params : {
			origin_port_id              : trend?.origin_location_id,
			destination_port_id         : trend?.destination_location_id,
			enable_sea_route_processing : true,
		},

	}, { manual: true });

	const getData = async () => {
		await trigger();
	};

	useEffect(() => {
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trend?.id]);
	return {
		loading,
		data,
		filters,
		setFilters,
	};
};

export default useGetSeaRoute;
