import { useDebounceQuery } from '@cogoport/forms';
import { useState } from 'react';

import Body from './components/Body';
import Header from './components/Header';
import useListShipment from './hooks/useListShipment';

function ShipmentAir() {
	const [serviceActiveTab, setServiceActiveTab] = useState('air_freight');

	const [shipmentStateTab, setShipmentStateTab] = useState('ongoing');

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const {
		data, filters, setFilters,
		loading, setPage,
	} =	 useListShipment({ serviceActiveTab, shipmentStateTab, searchQuery });
	return (
		<div>
			<h1>
				Air Bookings Desk
			</h1>
			<Header
				serviceActiveTab={serviceActiveTab}
				setServiceActiveTab={setServiceActiveTab}
				shipmentStateTab={shipmentStateTab}
				setShipmentStateTab={setShipmentStateTab}
				debounceQuery={debounceQuery}
				setFilters={setFilters}
				filters={filters}
			/>

			<Body data={data} loading={loading} setPage={setPage} />
		</div>
	);
}

export default ShipmentAir;
