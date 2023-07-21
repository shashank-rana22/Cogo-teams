import { Select } from '@cogoport/components';
import { IcCFtick, IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { serviceMappings } from '../../../../configs/AdditionalServicesConfig';
import Incoterms from '../../../../configs/incoterms.json';
import useSpotSearchService from '../../hooks/useCreateSpotSearchService';

import { getFclPayload } from './configs';
import ICONS_MAPPING from './icons-mapping';
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

				{shipperSideServices.length ? (
					<div style={{ marginBottom: 16 }}>
						<div className={styles.header}>
							<span>Seller Responsibilities</span>
							<span>Total landed Cost:</span>
						</div>
						{shipperSideServices.map((serviceItem) => (
							<div
								role="presentation"
								key={serviceItem.name}
								disabled={loading}
								className={`${styles.service} ${serviceItem.isSelected ? styles.active : null}`}
							>

								<div className={styles.service_div}>
									<span className={styles.icon}>
										{ICONS_MAPPING[serviceItem.service_type]}
									</span>

									<span className={styles.service_text}>
										{serviceItem.title}
									</span>
								</div>

								{serviceItem.isSelected ? (
									<IcCFtick
										height={25}
										width={25}
										className={styles.tick_icon}

									/>
								) : (
									<IcMPlus
										disabled={loading}
										height={22}
										width={22}
										className={styles.add_icon}
										fill="black"
										onClick={() => handleAddServices(serviceItem)}
									/>
								)}

							</div>
						))}
					</div>
				) : null}

				{consigneeSideServices.length ? (
					<div>
						<div className={styles.header}>
							<span>Buyer Responsibilities</span>
							<span>Total landed Cost:</span>

						</div>
						{consigneeSideServices.map((serviceItem) => (
							<div
								role="presentation"
								key={serviceItem.name}
								disabled={loading}
								className={`${styles.service} ${serviceItem.isSelected ? styles.active : null}`}
							>

								<div className={styles.service_div}>
									<span className={styles.icon}>
										{ICONS_MAPPING[serviceItem.service_type]}
									</span>
									<span className={styles.service_text}>
										{serviceItem.title}
									</span>
								</div>

								{serviceItem.isSelected ? (
									<IcCFtick
										height={25}
										width={25}
										className={styles.tick_icon}

									/>
								) : (
									<IcMPlus
										height={22}
										width={22}
										disabled={loading}
										className={styles.add_icon}
										fill="black"
										onClick={() => handleAddServices(serviceItem)}
									/>
								)}

							</div>
						))}
					</div>
				) : null}

			</div>
		</>
	);
}

export default AdditionalServices;
