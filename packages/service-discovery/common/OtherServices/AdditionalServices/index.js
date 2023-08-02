import { Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { serviceMappings } from '../../../configs/AdditionalServicesConfig';
import getTradeTypeWiseIncoTerms from '../../../configs/getTradeTypeWiseIncoTerms';

import ChangeIncoTermModal from './ChangeIncoTermModal';
import useGetMinPrice from './hooks/useGetMinPrice';
import List from './List';
import styles from './styles.module.css';
import getCombinedServiceDetails from './utils/getCombinedServiceDetails';
import getServiceName from './utils/getServiceName';

const TRANSPORTATION_SERVICES = ['ftl_freight', 'ltl_freight', 'trailer_freight'];
const singleLocationServices = ['fcl_freight_local'];

const SERVICES_CANNOT_BE_REMOVED_MAPPING = {
	export : 'export_fcl_freight_local',
	import : 'import_fcl_freight_local',
};

function AdditionalServices({ // used in search results and checkout
	rateCardData = {},
	detail = {},
	setHeaderProps = () => {},
	refetchSearch = () => {},
	source = '',
	searchLoading = false,
	refetchLoading = false,
}) {
	const { service_rates = [], total_price_currency = 'USD' } = rateCardData;

	const {
		service_details = {},
		service_type = '',
		trade_type = '',
		inco_term = '',
	} = detail;

	const finalServiceDetails = getCombinedServiceDetails(service_details, service_rates);

	const [incoTermModalData, setIncoTermModalData] = useState({});

	const primaryService = service_type;

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

	const { startingPrices = {}, loading: startingPriceLoading } = useGetMinPrice({
		allServices,
		total_price_currency,
		detail,
	});

	const filteredAllServices = allServices.filter((service_item) => service_item.inco_terms.includes(inco_term));

	const shipperSideServices = [];
	const consigneeSideServices = [];

	(source === 'checkout' ? filteredAllServices : allServices).forEach((item) => {
		if (item.name.includes('import')) {
			consigneeSideServices.push(item);
		} else {
			shipperSideServices.push(item);
		}
	});

	const incoTermOptions = getTradeTypeWiseIncoTerms(trade_type);

	const SERVICES_CANNOT_BE_REMOVED = ['fcl_freight', SERVICES_CANNOT_BE_REMOVED_MAPPING[trade_type]];

	return (
		<>
			<div className={styles.heading}>
				You may need these services
				{source === 'checkout' ? (
					<div style={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
						IncoTerms
						<Select
							value={inco_term}
							onChange={(val) => setIncoTermModalData({ selectedValue: val })}
							size="sm"
							options={incoTermOptions}
							className={styles.select}
						/>
					</div>
				) : null}
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
						startingPrices={startingPrices}
						startingPriceLoading={startingPriceLoading}
						refetchLoading={refetchLoading}
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
						startingPrices={startingPrices}
						startingPriceLoading={startingPriceLoading}
						refetchLoading={refetchLoading}
					/>
				)}
			</div>

			{!isEmpty(incoTermModalData) ? (
				<ChangeIncoTermModal
					incoTermModalData={incoTermModalData}
					setIncoTermModalData={setIncoTermModalData}
					searchLoading={searchLoading}
					getCheckout={refetchSearch}
					incoterm={inco_term}
					checkout_id={detail?.checkout_id}
				/>
			) : null}
		</>
	);
}

export default AdditionalServices;
