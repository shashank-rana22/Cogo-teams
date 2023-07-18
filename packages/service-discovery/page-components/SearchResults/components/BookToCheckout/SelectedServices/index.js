import { IcCFtick, IcMAppTruck } from '@cogoport/icons-react';
import React from 'react';

import { serviceMappings } from '../../../../../configs/AdditionalServicesConfig';
import getLocationInfo from '../../../utils/locations-search';

import getMapping from './getMapping';
import styles from './styles.module.css';

const getServiceName = (service) => {
	const { trade_type = '', service_type = '' } = service || {};
	return trade_type ? `${trade_type}_${service_type}` : service_type;
};

function SelectedServices({ rateDetails = {}, details = {} }) {
	const { service_rates = [] } = rateDetails || {};

	const { service_details = {}, service_type = '' } = details || {};

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

	const primaryService = Object.values(service_details).find((service) => service.service_type === primary_service);

	const { selectedServices, servicesMapping } = getMapping({
		primaryService,
		otherServices: service_details,
	});

	const { origin, destination } = getLocationInfo(details, {}, 'search_type');

	// console.log('selectedServices', selectedServices);
	// console.log('servicesMapping', servicesMapping);

	return (
		<div className={styles.container}>
			{(servicesMapping || []).map((serviceItem) => {
				const { key: service = '', label = '', icon: Icon = IcMAppTruck } = serviceItem;

				const isSelected = selectedServices.includes(service);
				// if (!isSelected) return null;

				if (service === primary_service) {
					const { shipping_line = {} } = rateDetails;
					return (
						<div key={service} className={styles.primary_service_item}>
							<div className={styles.icns_container}>
								<div className={styles.shipping_line}>
									<img
										src={shipping_line.logo_url}
										alt="shipping-line-icon"
										width={30}
										height={30}
									/>
									<strong>{shipping_line.business_name}</strong>
								</div>

								{isSelected ? (
									<IcCFtick width={26} height={26} />
								) : null}
							</div>

							<span>
								Landed Cost:
								{' '}
								<strong>$1,500</strong>
							</span>
						</div>
					);
				}

				return (
					<div key={service} className={styles.service_item}>
						<div className={styles.icns_container}>
							<Icon width={32} height={32} />

							<IcCFtick width={26} height={26} />
						</div>

						<span className={styles.label}>{label}</span>

						<span>INR 1,44,120</span>
					</div>
				);
			})}
		</div>
	);
}

export default SelectedServices;
