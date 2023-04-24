import React from 'react';

import Header from './Header';

function ServiceDetails({ servicesData = [] }) {
	const addedServiceComponent = (
		<div>
			<Header serviceData={servicesData?.[0]} />
		</div>
	);

	return addedServiceComponent;
}

export default ServiceDetails;
