import React, { useState } from 'react';

import getMapping from './getMapping';
import ServiceItem from './ServiceItem';
import PrimaryService from './ServiceItem/primaryService';
import styles from './styles.module.css';

const SERVICES_CANNOT_BE_REMOVED = ['origin_fcl_freight_local'];

function SelectedServices({ rateDetails = {}, details = {} }) {
	const { service_rates = [] } = rateDetails || {};

	const { service_details = {}, service_type = '' } = details || {};

	const primaryService = Object.values(service_details).find((service) => service.service_type === service_type);

	const { selectedServices, servicesMapping } = getMapping({
		primaryService,
		otherServices: service_details,
	});

	const [addedServices, setAddedServices] = useState(selectedServices);

	return (
		<div className={styles.container}>
			{(servicesMapping || []).map((serviceItem) => {
				if (serviceItem.key === service_type) {
					return (
						<PrimaryService
							key={serviceItem.key}
							serviceItem={serviceItem}
							rateDetails={rateDetails}
							details={details}
							service_type={service_type}
						/>
					);
				}

				return (
					<ServiceItem
						key={serviceItem.key}
						serviceItem={serviceItem}
						addedServices={addedServices}
						setAddedServices={setAddedServices}
						service_rates={service_rates}
						SERVICES_CANNOT_BE_REMOVED={SERVICES_CANNOT_BE_REMOVED}
					/>
				);
			})}
		</div>
	);
}

export default SelectedServices;
