import React from 'react';

import Header from './Header';

function ServiceDetails({ servicesData = [], containerDetails = [], activeStakeholder = '' }) {
	return (
		<Header
			serviceData={servicesData}
			containerDetails={containerDetails}
			activeStakeholder={activeStakeholder}
		/>
	);
}

export default ServiceDetails;
