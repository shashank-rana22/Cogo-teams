import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import useGetRollingForecastFclFreightData from '../../hooks/useGetRollingForecastFclFreightData';

import Graph from './Graph';
import Header from './Header';
import SupplierList from './SupplierList';

function DetailView() {
	const { query } = useRouter();
	const { origin_id = '', destination_id = '' } = query || {};

	const { getRollingForecastPortPairs, data, loading } = useGetRollingForecastFclFreightData();

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
			<Graph data={data} loading={loading} />
			<SupplierList
				origin_location_id={origin_id}
				destination_location_id={destination_id}
			/>
		</div>
	);
}

export default DetailView;
