import { cl } from '@cogoport/components';
import React from 'react';

import getConfigs from '../configurations/get-configs';

// import CreateNew from './CreateNew';
import Details from './Details';
import Header from './Header';
import Status from './Status';
import styles from './styles.module.css';

function ServiceDetails({
	servicesData = {},
	serviceName = '',
	servicesList = [],
	shipmentData = {},
	service = '',
	cancelUpsellFor = '',
	refetchServices = () => {},
	primary_service = {},
}) {
	const {
		id = '',
		service_type = '',
		state = '',
		supply_agent = '',
		payment_term = '',
		service_provider = '',
		display_label = '',
	} = servicesData?.[0];

	const { source = '' } = shipmentData;
	// const isHaulageAvailable = () => {
	// 	if (routeLeg.service_types[0] === 'haulage_freight_service') {
	// 		if (routeLeg.trade_type === 'export') {
	// 			return (
	// 				primary_service?.origin_port?.is_icd || primary_service?.port?.is_icd
	// 			);
	// 		}
	// 		return (
	// 			primary_service?.destination_port?.is_icd
	// 			|| primary_service?.port?.is_icd
	// 		);
	// 	}
	// 	return true;
	// };

	// const canUpsell = source !== 'consol'
	// 	&& !shipmentData?.is_job_closed
	// 	&& routeLeg.service_types[0] !== cancelUpsellFor
	// 	&& isHaulageAvailable
	// 	&& shipmentData?.state !== 'cancelled';

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
