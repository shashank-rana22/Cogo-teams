import { cl } from '@cogoport/components';
import React from 'react';

// import getConfigs from '../../../../configurations/Supplier/get-configs';

import CreateNew from './CreateNew';
import Details from './Details';
import Header from './Header';
// import Status from './Status';
import styles from './styles.module.css';

function ServiceDetails({
	serviceData = {},
	serviceList = [],
	shipmentData = {},
	isSeller = false,
	isMain = false,
	cancelUpsellFor = '',
	refetchServices = () => {},
	primary_service = {},
}) {
	const {
		id = '',
		service_type = '',
		state = '',
		service_supply_agent = '',
		payment_term = '',
		routeLeg = '',
		service_provider = '',
	} = serviceData;

	// const isSo1So2 = shipmentData?.stakeholder_types?.some((ele) => ['service_ops1', 'service_ops2'].includes(ele));
	const { source = '', shipment_type = '' } = shipmentData;
	const isHaulageAvailable = () => {
		if (routeLeg.service_types[0] === 'haulage_freight_service') {
			if (routeLeg.trade_type === 'export') {
				return (
					primary_service?.origin_port?.is_icd || primary_service?.port?.is_icd
				);
			}
			return (
				primary_service?.destination_port?.is_icd
				|| primary_service?.port?.is_icd
			);
		}
		return true;
	};

	// const canUpsell = !isSo1So2
	// 	&& source !== 'consol'
	// 	&& shipment_type !== 'domestic_air_freight'
	// 	&& !shipmentData?.is_job_closed
	// 	&& routeLeg.service_types[0] !== cancelUpsellFor
	// 	&& isHaulageAvailable(primary_service)
	// 	&& shipmentData?.state !== 'cancelled';

	// const service_items_key = getConfigs(service_type).details || {};

	const addedServiceComponent = (
		<div className={cl`${styles.container} ${state}`}>
			<Header
				service_type={service_type}
				id={id}
				serviceData={[serviceData]}
				state={state}
				heading={routeLeg.display}
				service_supply_agent={service_supply_agent}
				// serviceList={serviceList}
				shipmentData={shipmentData}
				isSeller={isSeller}
				service_provider={service_provider}
				refetchServices={refetchServices}
			/>

			{/* <Status state={state} payment_term={payment_term} /> */}

			<Details
				state={state}
				// serviceItemsKey={service_items_key}
				service_data={serviceData}
			/>
		</div>
	);

	const canUpsell = true;
	const createNew = canUpsell ? (
		<CreateNew
			routeLeg={routeLeg}
			// serviceList={serviceList}
			shipment_data={shipmentData}
		/>
	) : null;

	if (isMain) {
		return id ? addedServiceComponent : null;
	}

	return state ? addedServiceComponent : createNew;
}

export default ServiceDetails;
