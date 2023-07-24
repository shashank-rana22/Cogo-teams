import React from 'react';

import Header from './Header';

function ServiceDetails({ servicesData = [] }) {
	return <Header serviceData={servicesData} />;
}

export default ServiceDetails;
