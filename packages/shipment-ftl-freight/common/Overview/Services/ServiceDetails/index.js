import React from 'react';

import Header from './Header';

const formatValue = (all_services) => {
	const result = (all_services || []).reduce((accumulator, service) => {
		if (service?.service_type !== 'subsidiary_service') {
			const truckServices = accumulator[service?.truck_type] || [];
			return {
				...accumulator,
				[service?.truck_type]: [...truckServices, service],
			};
		}
		return accumulator;
	}, {});

	return result;
};

function ServiceDetails({ servicesData = [] }) {
	const truckCards = formatValue(servicesData);

	const addedServiceComponent = (
		Object.keys(truckCards).map((truckCard) => (
			<Header serviceData={truckCards[truckCard]} />
		))
	);

	return addedServiceComponent;
}

export default ServiceDetails;
