import React from 'react';

import Header from './Header';

function ServiceDetails({ servicesData = [], containerDetails = [] }) {
	return <Header serviceData={servicesData} containerDetails={containerDetails} />;
}

export default ServiceDetails;
