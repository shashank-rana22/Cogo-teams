import { IcMArrowRight } from '@cogoport/icons-react';
import React, { useContext } from 'react';

import { ShipmentDetailContext } from '@cogoport/context';

import ActiveService from './ActiveService';
import InactiveService from './InactiveService';
import Loader from './Loader';
import MainService from './MainService';
import possibleFullRouteConfigs from './possible-full-route.json';
import styles from './styles.module.css';

const trasportationServices = [
	'ftl_freight_service',
	'trailer_freight_service',
	'ltl_freight_service',
];

const isTrasportationAvailable = (allServices, trade_type) => {
	const obj = allServices?.find(
		(service) => trasportationServices.includes(service?.display_service_type)
			&& service?.trade_type === trade_type,
	);
	return !obj;
};

const getServiceData = (allServices, routeLeg) => allServices?.find(
	(service) => ((routeLeg?.service_types || []).includes(service?.service_type)
		|| (routeLeg?.service_types || []).includes(
			service?.display_service_type,
		))
		&& (!service?.trade_type
			|| !routeLeg?.trade_type
			|| service?.trade_type === routeLeg?.trade_type),
);

const isServiceTakenFunc = (allServices, routeLeg) => (
	allServices?.filter(
		(service) => (routeLeg?.service_types || []).includes(
			service?.display_service_type,
		)
			&& (!service?.trade_type
				|| !routeLeg?.trade_type
				|| service?.trade_type === routeLeg?.trade_type),
	)?.length > 0
);

const isHaulageAvailable = (
	origin_port = {},
	destination_port = {},
	port = {},
	tradeType,
) => {
	if (tradeType === 'export') {
		return origin_port?.is_icd || port?.is_icd;
	}
	return destination_port?.is_icd || port?.is_icd;
};

function Route({ allServices = [], loading = false, refetch = () => { } }) {
	const { shipment_data, isGettingShipment, servicesList, primary_service } = useContext(
		ShipmentDetailContext,
	);
	const { source = '', shipment_type = '' } = shipment_data;

	const {
		origin_port = {},
		destination_port = {},
		port = {},
	} = primary_service;

	const mainServiceName = primary_service?.service_name;
	const possibleFullRoute = possibleFullRouteConfigs?.[mainServiceName];

	const isOriginTransportionAvailable = isTrasportationAvailable(
		allServices,
		'export',
	);
	const isDestinationTransportationAvailable = isTrasportationAvailable(
		allServices,
		'import',
	);

	const renderItem = (routeLeg) => {
		const isServiceTaken = isServiceTakenFunc(allServices, routeLeg);

		let isUpsellServiceAvailable = shipment_data?.state !== 'cancelled';

		if (
			!isServiceTaken
			&& isUpsellServiceAvailable
			&& trasportationServices.includes(routeLeg?.service_types?.[0])
		) {
			isUpsellServiceAvailable = (routeLeg.trade_type === 'export' && isOriginTransportionAvailable)
				|| (routeLeg.trade_type === 'import'
					&& isDestinationTransportationAvailable);
		}

		if (
			!isServiceTaken
			&& isUpsellServiceAvailable
			&& routeLeg?.service_types?.[0] === 'haulage_freight_service'
		) {
			isUpsellServiceAvailable = isHaulageAvailable(
				origin_port,
				destination_port,
				port,
				routeLeg.trade_type,
			);
		}

		if (
			shipment_data?.is_job_closed
			|| (source === 'consol' && shipment_type === 'domestic_air_freight')
		) {
			isUpsellServiceAvailable = false;
		}

		if ('seperator' in routeLeg) {
			return (
				<div className={styles.arrow_container}>
					<IcMArrowRight height={28} width={28} />
				</div>
			);
		}

		if ('mainServices' in routeLeg) {
			return (
				<MainService
					allServices={allServices}
					routeLeg={routeLeg}
					data={getServiceData(allServices, routeLeg) || primary_service}
					shipment_data={shipment_data}
					primary_service={primary_service}
					refetch={refetch}
				/>
			);
		}

		if (isServiceTaken) {
			return (
				<ActiveService
					routeLeg={routeLeg}
					data={getServiceData(allServices, routeLeg) || primary_service}
				/>
			);
		}

		return (
			<InactiveService
				routeLeg={routeLeg}
				shipment_data={shipment_data}
				services={allServices}
				isUpsellServiceAvailable={isUpsellServiceAvailable}
			/>
		);
	};

	return (
		<div className={styles.container}>
			{isGettingShipment || loading ? (
				<Loader />
			) : (
				<div className={styles.route_wrap}>
					{(possibleFullRoute || []).map((routeLeg) => renderItem(routeLeg))}
				</div>
			)}
		</div>
	);
}

export default Route;
