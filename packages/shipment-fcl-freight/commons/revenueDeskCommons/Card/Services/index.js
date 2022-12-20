import React from 'react';
import {Tags} from '@cogoport/components'
import { startCase , upperCase} from '@cogoport/utils';
import styles from './styles.module.css'

const notToShowServices = [
	'fcl_freight_local_service',
	'lcl_freight_local_service',
	'air_freight_local_service',
];

const Services = ({ services, onClick, activeService }) => {
	return (
		<div className={styles.container}>
			{(services || [])
				.filter((service) => !notToShowServices.includes(service.service_type))
				.map((service) => {
					const newShipmentType = service.service_type.split('_service')[0];
					const tradeType =
						service.trade_type === 'export' ? 'Origin' : 'Destination';
					return (
						<div className = {styles.tagWrapper} onClick={() => onClick(service)}>
							<Tags
								className={
									activeService === service.id ? 'ell' : 'all'
								}
							>
								Select {tradeType} {upperCase(startCase(newShipmentType))}{' '}
								Preferences
							</Tags>
						</div>
					);
				})}
		</div>
	);
};

export default Services;