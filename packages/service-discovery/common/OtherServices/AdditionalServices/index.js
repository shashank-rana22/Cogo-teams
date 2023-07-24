import { Select } from '@cogoport/components';
import React, { useState } from 'react';

import { serviceMappings } from '../../../configs/AdditionalServicesConfig';
import Incoterms from '../../../configs/incoterms.json';
import useSpotSearchService from '../../../page-components/SearchResults/hooks/useCreateSpotSearchService';
import useGetMinPrice from '../useGetMinPrice';

import { getFclPayload } from './configs';
import List from './List';
import styles from './styles.module.css';

const INCOTERM_MAPPING = {
	export : 'ddp',
	import : 'exw',
};

const getServiceName = (service) => {
	const { trade_type = '', service_type = '' } = service || {};
	return trade_type ? `${trade_type}_${service_type}` : service_type;
};

const singleLocationServices = ['fcl_freight_local'];

// eslint-disable-next-line max-lines-per-function
function AdditionalServices({ // used in search results and checkout
	rateCardData = {},
	detail = {},
	setHeaderProps = () => {},
	refetchSearch = () => {},
}) {
	const { service_rates = [] } = rateCardData;

	const { service_details = {}, service_type = '', trade_type = '', checkout_id = '' } = detail;

	const [incoterm, setIncoterm] = useState(INCOTERM_MAPPING[trade_type]);

	const primaryService = service_type;

	const { addService = () => {}, loading } = useSpotSearchService({
		refetchSearch,
		rateCardData,
		checkout_id,
	});

	const { minPrice = {}, loading: minPriceLoading } = useGetMinPrice({ detail });

	const handleAddServices = async (serviceItem) => {
		if (!serviceItem.controls.length) {
			const payload = getFclPayload({
				rateCardData,
				detail,
				additionalFormInfo : {},
				service_name       : serviceItem.name,
			});
			await addService(payload);
			return;
		}

		setHeaderProps({
			key     : 'additional_services_details',
			rateCardData,
			setHeaderProps,
			service : serviceItem,
			refetchSearch,
			detail,
		});
	};

	const isSingleLocationService = singleLocationServices.includes(service_type);

	const servicesArray = serviceMappings({
		service                : primaryService,
		destination_country_id : detail.destination_country_id,
		origin_country_id      : detail.origin_country_id,
	});

	const serviceData = {};

	Object.keys(service_rates).forEach((serviceId) => {
		const serviceItem = service_details[serviceId];

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
			transportationData =				serviceData[`${service.trade_type}_ltl_freight`]
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
			rateData: Object.values(service_rates).find(
				(serviceItem) => serviceItem.service_type === service.service_type,
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
				<List
					list={shipperSideServices}
					loading={loading}
					onClickAdd={handleAddServices}
					type="seller"
				/>

				<List
					list={consigneeSideServices}
					loading={loading}
					onClickAdd={handleAddServices}
					type="buyer"
				/>
			</div>
		</>
	);
}

export default AdditionalServices;
