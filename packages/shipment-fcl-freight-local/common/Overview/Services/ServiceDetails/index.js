import React from 'react';

import Header from './Header';

function ServiceDetails({ servicesData = [], activeStakeholder = '' }) {
	return	<Header serviceData={servicesData} activeStakeholder={activeStakeholder} />;
}

export default ServiceDetails;
