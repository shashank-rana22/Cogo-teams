import { cl } from '@cogoport/components';
import React from 'react';

import getConfigs from '../configurations/get-configs';

import Details from './Details';
import Header from './Header';
import Status from './Status';
import styles from './styles.module.css';

function ServiceDetails({
	servicesData = {},
	servicesList = [],
	shipmentData = {},
	refetchServices = () => {},
}) {
	const {
		id = '',
		service_type = '',
		state = '',
		supply_agent = {},
		payment_term = '',
		service_provider = {},
		display_label = '',
	} = servicesData[0];

	const service_items_key = getConfigs(service_type).details || {};

	const addedServiceComponent = (
		<div className={cl`${styles.container} ${state}`}>
			<Header
				service_type={service_type}
				id={id}
				serviceData={servicesData}
				state={state}
				heading={display_label}
				supply_agent={supply_agent}
				servicesList={servicesList}
				shipmentData={shipmentData}
				service_provider={service_provider}
				refetchServices={refetchServices}
			/>

			<Status state={state} payment_term={payment_term} />

			{(servicesData || []).map((singleService, index) => (
				<div
					className={cl`${servicesData?.length === index + 1 ? styles.last : styles.other}`}
				>
					<Details
						serviceData={singleService}
						shipmentData={shipmentData}
						serviceItemsKey={service_items_key}
					/>
				</div>
			))}

		</div>
	);

	return addedServiceComponent;
}

export default ServiceDetails;
