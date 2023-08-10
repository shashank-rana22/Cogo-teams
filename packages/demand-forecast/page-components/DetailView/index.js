import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import useGetRollingForecastFclFreightData from '../../hooks/useGetRollingForecastFclFreightData';

import Graph from './Graph';
import Header from './Header';
import SupplierList from './SupplierList';

function DetailView() {
	const { query } = useRouter();
	const { origin_id = '', destination_id = '' } = query || {};

	const { getRollingForecastPortPairs, data } = useGetRollingForecastFclFreightData();

	useEffect(() => {
		getRollingForecastPortPairs({ origin_location_id: origin_id, destination_location_id: destination_id });
	}, [destination_id, getRollingForecastPortPairs, origin_id]);

	console.log('data', data);

	return (
		<div>
			<Header />
			<Graph />
			<SupplierList />
		</div>
	);
}

export default DetailView;
