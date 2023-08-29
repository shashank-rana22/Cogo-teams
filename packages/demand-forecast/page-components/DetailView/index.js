import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import useGetRollingForecastFclFreightData from '../../hooks/useGetRollingForecastFclFreightData';

import Graph from './Graph';
import Header from './Header';
import SupplierList from './SupplierList';

function DetailView() {
	const { query } = useRouter();
	const { general = {} } = useSelector((state) => state);

	const isMiniCluster = general?.pathname.includes('remaining_clusters');

	const { origin_id = '', destination_id = '' } = query || {};

	const { getRollingForecastPortPairs, data, loading } = useGetRollingForecastFclFreightData({ isMiniCluster });

	useEffect(() => {
		getRollingForecastPortPairs({ origin_location_id: origin_id, destination_location_id: destination_id });
	}, [destination_id, getRollingForecastPortPairs, origin_id]);

	const {
		origin_location = {}, destination_location = {}, week_info = {}, total_estimated_demand
		= '',
	} = data || {};

	return (
		<div>
			<Header
				origin_location={origin_location}
				destination_location={destination_location}
				week_info={week_info}
				total_estimated_demand={total_estimated_demand}
				loading={loading}
			/>
			<Graph data={data} loading={loading} total_estimated_demand={total_estimated_demand} />
			<SupplierList
				origin_location_id={origin_id}
				destination_location_id={destination_id}
				total_estimated_demand={total_estimated_demand}
				isMiniCluster={isMiniCluster}
			/>
		</div>
	);
}

export default DetailView;
