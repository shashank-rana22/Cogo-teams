import { cl } from '@cogoport/components';
import React from 'react';

import CargoDetails from '../../CargoDetails';
import Icon from '../Icons/Icon';
import icons from '../Icons/icons';

import styles from './styles.module.css';

const singleServices = [
	'ltl_freight_service',
	'ftl_freight_service',
	'trailer_freight_service',
	'haulage_freight_service',
	'fcl_customs_service',
	'lcl_customs_service',
	'air_customs_service',
];

function MainService({
	routeLeg,
	primary_service,
	allServices,
	shipment_data,
	refetch = () => {},
}) {
	const includesLocalServices = routeLeg?.mainServices?.length > 1
		&& !shipment_data?.shipment_type?.includes('_local');

	let className = includesLocalServices ? styles.local_services : '';

	const isServiceTakenFunc = (route_leg) => (
		allServices?.filter(
			(service) => ((route_leg?.service_types || []).includes(service?.service_type)
						|| (route_leg?.service_types || []).includes(
							service?.display_service_type,
						))
					&& (!service?.trade_type
						|| !route_leg?.trade_type
						|| service?.trade_type === route_leg?.trade_type),
		)?.length > 0
	);

	const filteredServices = (routeLeg?.mainServices || []).filter((item) => isServiceTakenFunc(item));

	const isSingleService = singleServices?.includes(
		routeLeg?.mainServices?.[0]?.service_types?.[0],
	);

	if (isSingleService) {
		className = '';
	}

	console.log(primary_service, allServices, shipment_data, 'routeLeg', routeLeg, filteredServices);

	return (
		<div className={cl`${styles.container} ${className}`}>
			<div className={styles.service_info_container}>
				<div className={styles.icon_container}>
					<Icon type={icons[routeLeg?.mainServices[0]?.iconType]} />
				</div>
				<div className={styles.service_name_container}>
					{isSingleService ? (
						<div className={cl` ${styles.service_name} ${styles.className}`}>
							<div className={styles.name}>{routeLeg?.mainServices[0]?.display}</div>
						</div>
					) : (
						filteredServices?.map((item, index) => (
							<div className={cl`${styles.service_name} ${styles.className}`}>
								<div className={styles.name}>{item?.display}</div>

								{index === filteredServices?.length - 1 ? null : (
									<div className={styles.service_icon}>+</div>
								)}
							</div>
						))
					)}
				</div>
			</div>

			<div className={styles.more_info_container}>
				<CargoDetails
					primary_service={primary_service}
					shipment_data={shipment_data}
				/>
			</div>
		</div>
	);
}

export default MainService;
