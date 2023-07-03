import { Select } from '@cogoport/components';
import { IcCFtick, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { serviceMappings } from '../../../../configs/AdditionalServicesConfig';
import Incoterms from '../../../../configs/incoterms.json';
import useSpotSearchService from '../../hooks/useCreateSpotSearchService';

import styles from './styles.module.css';
import getPayload from './utils/getPayload';

function AdditionalServices({
	rateCardData = {}, detail = {}, setHeaderProps = () => {},
	refetchspotSearch = () => {},
}) {
	const { service_type, service_rates } = rateCardData;

	const [incoterms, setIncoterms] = useState('cif');
	const [additionalServiceDetails, setAdditionalServiceDetails] = useState({});

	const { addService = () => {} } = useSpotSearchService({
		refetchspotSearch,
	});

	const primaryService = service_type;

	const alreadyAddedServices = Object.values(service_rates).map((serviceItem) => {
		if (primaryService === serviceItem.service_type) {
			return primaryService;
		}
		return `${serviceItem?.trade_type}_${serviceItem?.service_type}`;
	});

	const { services = [], serviceLabel } = serviceMappings[primaryService];

	const originIcd = detail?.trade_type === 'export'
		? detail?.origin_port?.is_icd || detail?.port?.is_icd
		: detail?.origin_port?.is_icd;

	const destinationIcd = detail?.trade_type === 'import'
		? detail?.destination_port?.is_icd || detail?.port?.is_icd
		: detail?.destination_port?.is_icd;

	let SHIPPERS_SERVICES = [];
	let CONSGINEE_SERVICES = [];

	(services[incoterms] || []).forEach((item) => {
		if (!item.includes('import')) {
			SHIPPERS_SERVICES.push({
				name       : item,
				label      : serviceLabel[item].title,
				icon       : serviceLabel[item].icon,
				isSelected : alreadyAddedServices.includes(item),
			});
		} else {
			CONSGINEE_SERVICES.push({
				name       : item,
				label      : serviceLabel[item].title,
				icon       : serviceLabel[item].icon,
				isSelected : alreadyAddedServices.includes(item),
			});
		}
	});

	if (!originIcd) {
		SHIPPERS_SERVICES = SHIPPERS_SERVICES.filter((item) => item.name !== 'export_haulage_freight');
	}

	if (!destinationIcd) {
		CONSGINEE_SERVICES = CONSGINEE_SERVICES.filter((item) => item.name !== 'import_haulage_freight');
	}

	const handleAddServices = (service_name) => {
		if (!isEmpty(additionalServiceDetails)) {
			const payload = getPayload({
				rateCardData,
				detail,
				additionalServiceDetails,
				service_name,
			});

			addService(payload);
		}
		if (isEmpty(additionalServiceDetails)) {
			setHeaderProps({
				key: 'additional_services_details',
				rateCardData,
				setAdditionalServiceDetails,
				setHeaderProps,
			});
		}
	};

	return (
		<>
			<div className={styles.heading}>
				You may need these services
				<div style={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
					IncoTerms
					<Select
						value={incoterms}
						onChange={setIncoterms}
						size="sm"
						options={Incoterms}
						className={styles.select}
					/>
				</div>

			</div>
			<div className={styles.additional_services}>

				{SHIPPERS_SERVICES.length ? (
					<div>
						<div className={styles.header}>
							<span>Seller Responsibilities</span>
							<span>Total landed Cost:</span>
						</div>
						{SHIPPERS_SERVICES.map((serviceItem) => (
							<div
								role="presentation"
								key={serviceItem.name}
								className={`${styles.service} ${serviceItem.isSelected ? styles.active : null}`}
							>

								<div className={styles.service_div}>
									<span
										className={styles.icon}
									>
										<img
											src={serviceItem.icon}
											width={34}
											height={34}
											alt="mode-icon"

										/>
									</span>
									<span className={styles.service_text}>
										{serviceItem.label}
									</span>
								</div>

								{serviceItem.isSelected ? (
									<IcCFtick
										height={25}
										width={25}
										className={styles.tick_icon}

									/>
								)
									: (
										<IcMPlus
											height={22}
											width={22}
											className={styles.add_icon}
											fill="black"
											onClick={() => handleAddServices(serviceItem.name)}
										/>
									)}

							</div>
						))}
					</div>
				) : null}

				{CONSGINEE_SERVICES.length ? (
					<div>
						<div className={styles.header}>
							<span>Buyer Responsibilities</span>
							<span>Total landed Cost:</span>
						</div>
						{CONSGINEE_SERVICES.map((serviceItem) => (
							<div
								key={serviceItem.name}
								className={`${styles.service} ${serviceItem.isSelected ? 'active' : 'inactive'}`}
							>

								<div className={styles.service}>
									<span className={styles.icon}>
										<img
											src={serviceItem.icon}
											width={34}
											height={34}
											alt="mode-icon"
										/>
									</span>
									<span className={styles.service_text}>
										{serviceItem.label}
									</span>
								</div>

								{serviceItem.isSelected ? (
									<IcCFtick
										height={25}
										width={25}
										className={styles.tick_icon}

									/>
								)
									: (
										<IcMPlus
											height={22}
											width={22}
											className={styles.add_icon}
											fill="black"
											onClick={() => handleAddServices(serviceItem.name)}
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
