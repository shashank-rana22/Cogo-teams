import React from 'react';

import ContainerTracking from './ContainerTracking';

function Tracking({ shipmentData }) {
	return (
		<ContainerTracking shipment_data={shipmentData} />
	);
}

export default Tracking;
