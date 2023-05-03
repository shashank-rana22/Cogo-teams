import React from 'react';

import Header from './Header';

function ServiceDetails({ servicesData = [] }) {
	const addedServiceComponent = (
		<Header serviceData={servicesData} />
	);

	return addedServiceComponent;
}

export default ServiceDetails;
