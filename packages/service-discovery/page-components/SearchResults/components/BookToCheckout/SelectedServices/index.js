import React, { useState } from 'react';

import getMapping from './getMapping';
import ServiceItem from './ServiceItem';
import PrimaryService from './ServiceItem/primaryService';
import styles from './styles.module.css';

function SelectedServices({ rateDetails = {}, details = {} }) {
	const { service_rates = [] } = rateDetails || {};

	console.log('rateDetails', rateDetails);

	const { service_details = {}, service_type = '', trade_type = '' } = details || {};

	const primaryServiceData = Object.values(service_details).find((service) => service.service_type === service_type);

	const { selectedServices, servicesMapping } = getMapping({
		primaryService : primaryServiceData,
		otherServices  : service_details,
	});

	const SERVICE_CANNOT_BE_REMOVED = trade_type === 'export'
		? 'origin_fcl_freight_local' : 'destination_fcl_freight_local';

	const [addedServices, setAddedServices] = useState(selectedServices);

	return (
		<div className={styles.container}>
			{(servicesMapping || []).map((serviceItem) => {
				if (!serviceItem) return null;

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
						SERVICE_CANNOT_BE_REMOVED={SERVICE_CANNOT_BE_REMOVED}
					/>
				);
			})}
		</div>
	);
}

export default SelectedServices;
