import React from 'react';
import ContainerTracking from './ContainerTracking';

function Tracking({shipmentData}) {
	console.log('shipmentData',shipmentData);
	return (
		<ContainerTracking shipmentData={shipmentData}></ContainerTracking>
	);
}

export default Tracking;
