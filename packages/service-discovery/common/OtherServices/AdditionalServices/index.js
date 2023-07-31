import { Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { serviceMappings } from '../../../configs/AdditionalServicesConfig';
import Incoterms from '../../../configs/incoterms.json';

import useGetMinPrice from './hooks/useGetMinPrice';
import List from './List';
import styles from './styles.module.css';
import getCombinedServiceDetails from './utils/getCombinedServiceDetails';
import getServiceName from './utils/getServiceName';

const INCOTERM_MAPPING = {
	export : 'ddp',
	import : 'exw',
};

const TRANSPORTATION_SERVICES = ['ftl_freight', 'ltl_freight', 'trailer_freight'];

const singleLocationServices = ['fcl_freight_local'];

function AdditionalServices({ // used in search results and checkout
	rateCardData = {},
	detail = {},
	setHeaderProps = () => {},
	refetchSearch = () => {},
}) {
	const { service_rates = [] } = rateCardData;

	const { service_details = {}, service_type = '', trade_type = '' } = detail;

	const finalServiceDetails = getCombinedServiceDetails(service_details, service_rates);

	const [incoterm, setIncoterm] = useState(INCOTERM_MAPPING[trade_type]);

	const primaryService = service_type;

	const { minPrice = {}, loading: minPriceLoading } = useGetMinPrice();

	const isSingleLocationService = singleLocationServices.includes(service_type);

	const servicesArray = serviceMappings({
		service                : primaryService,
		destination_country_id : detail.destination_country_id,
		origin_country_id      : detail.origin_country_id,
	});

	const serviceData = {};

	Object.keys(finalServiceDetails).forEach((serviceId) => {
		const serviceItem = finalServiceDetails[serviceId];

		const serviceName = getServiceName(serviceItem);

		if (!serviceData[serviceName]) {
			serviceData[serviceName] = [];
		}

		serviceData[serviceName].push(serviceItem);
	});

	const allServices = [];

	servicesArray.forEach((service) => {
		if (service.service_type === 'haulage_freight') {
			if (isSingleLocationService && !detail.port?.is_icd) {
				return;
			}

			if (
				!isSingleLocationService
				&& service.trade_type === 'export'
				&& !detail.origin_port?.is_icd
			) {
				return;
			}

			if (
				!isSingleLocationService
				&& service.trade_type === 'import'
				&& !detail.destination_port?.is_icd
			) {
				return;
			}
		}

		let isSelected = !!serviceData[service.name];

		const tempServiceNames = [];
		if (
			service.name.includes('air_freight_local')
			&& Object.keys(serviceData).includes('domestic_air_freight_local')
		) {
			serviceData.domestic_air_freight_local.forEach((element) => {
				let name = '';
				if (element?.terminal_charge_type === 'outbound') {
					name = 'export';
				} else if (element?.terminal_charge_type === 'inbound') {
					name = 'import';
				}

				tempServiceNames.push(`${name}_${element.service_type}`);
			});
		}

		if (tempServiceNames.includes(service.name)) {
			isSelected = true;
		}

		let transportationData = null;

		if (service.name.includes('transportation')) {
			transportationData = serviceData[`${service.trade_type}_ltl_freight`]
				|| serviceData[`${service.trade_type}_ftl_freight`]
				|| serviceData[`${service.trade_type}_trailer_freight`];

			isSelected = !!transportationData;
		}

		allServices.push({
			...service,
			data: service.name.includes('transportation')
				? transportationData
				: serviceData[service.name],
			isSelected,
			rateData: Object.values(finalServiceDetails).filter(
				(serviceItem) => {
					if (TRANSPORTATION_SERVICES.includes(serviceItem.service_type)) {
						return service.name === `${serviceItem.trade_type}_transportation`;
					}
					return getServiceName(serviceItem) === service.name;
				},
			),
		});
	});

	const filteredAllServices = allServices.filter((service_item) => service_item.inco_terms.includes(incoterm));

	const shipperSideServices = [];
	const consigneeSideServices = [];

	(incoterm ? filteredAllServices : allServices).forEach((item) => {
		if (item.name.includes('import')) {
			consigneeSideServices.push(item);
		} else {
			shipperSideServices.push(item);
		}
	});

	const SERVICES_CANNOT_BE_REMOVED = [trade_type === 'export'
		? 'export_fcl_freight_local' : 'import_fcl_freight_local', 'fcl_freight'];

	return (
		<>
			<div className={styles.heading}>
				You may need these services
				<div style={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
					IncoTerms
					<Select
						value={incoterm}
						onChange={setIncoterm}
						size="sm"
						options={Incoterms}
						className={styles.select}
					/>
				</div>

			</div>

			<div className={styles.additional_services}>
				{isEmpty(shipperSideServices) ? null : (
					<List
						list={shipperSideServices}
						type="seller"
						detail={detail}
						rateCardData={rateCardData}
						setHeaderProps={setHeaderProps}
						refetch={refetchSearch}
						SERVICES_CANNOT_BE_REMOVED={SERVICES_CANNOT_BE_REMOVED}
					/>
				)}

				{isEmpty(consigneeSideServices) ? null : (
					<List
						list={consigneeSideServices}
						type="buyer"
						detail={detail}
						rateCardData={rateCardData}
						setHeaderProps={setHeaderProps}
						refetch={refetchSearch}
						SERVICES_CANNOT_BE_REMOVED={SERVICES_CANNOT_BE_REMOVED}
					/>
				)}
			</div>
		</>
	);
}

export default AdditionalServices;
