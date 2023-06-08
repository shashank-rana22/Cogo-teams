import { useState } from 'react';

import Body from './components/Body';
import Header from './components/Header';
import useListShipment from './hooks/useListShipment';

function ShipmentAir() {
	const [serviceActiveTab, setServiceActiveTab] = useState('air_freight');

	const [shipmentStateTab, setShipmentStateTab] = useState('ongoing');

	const { data } = useListShipment({ serviceActiveTab, shipmentStateTab });

	console.log(data, serviceActiveTab, shipmentStateTab, 'data1');
	return (
		<div>
			<h1>
				Air Bookings
			</h1>
			<Header
				serviceActiveTab={serviceActiveTab}
				setServiceActiveTab={setServiceActiveTab}
				shipmentStateTab={shipmentStateTab}
				setShipmentStateTab={setShipmentStateTab}
			/>
			<Body data={data} />
		</div>
	);
}

export default ShipmentAir;
