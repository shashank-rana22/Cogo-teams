import React from 'react';

import { serviceMappings } from '../../../../../configs/AdditionalServicesConfig';

import getMapping from './getMapping';
import styles from './styles.module.css';

const getServiceName = (service) => {
	const { trade_type = '', service_type = '' } = service || {};
	return trade_type ? `${trade_type}_${service_type}` : service_type;
};

function SelectedServices({ rateDetails = {}, details = {} }) {
	const { service_type, service_rates = [] } = rateDetails || {};

	const { service_details } = details || {};

	const primary_service = service_type;

	const servicesArray = serviceMappings({
		service                : primary_service,
		destination_country_id : details.destination_country_id,
		origin_country_id      : details.origin_country_id,
	});

	const serviceData = {};

	Object.keys(service_rates).forEach((serviceId) => {
		const serviceItem = service_rates[serviceId];

		const serviceName = getServiceName(serviceItem);

		if (!serviceData[serviceName]) {
			serviceData[serviceName] = [];
		}

		serviceData[serviceName].push(serviceItem);
	});

	const primaryService = Object.keys(service_details).some((service) => service.service_type === primaryService);

	const { selectedServices, servicesMapping } = getMapping({
		primaryService,
		otherServices: service_details,
	});

	return (
		<div className={styles.container}>ServicesTimeline</div>
	);
}

export default SelectedServices;
