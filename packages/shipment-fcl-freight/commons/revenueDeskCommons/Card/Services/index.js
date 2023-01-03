import { Button } from '@cogoport/components';
import { startCase, upperCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const notToShowServices = [
	'fcl_freight_local_service',
];

function Services({ services, onClick }) {
	return (
		<div className={styles.container}>
			{(services || [])
				.filter((service) => !notToShowServices.includes(service.service_type))
				.map((service) => {
					const newShipmentType = service.service_type.split('_service')[0];
					const tradeType =						service.trade_type === 'export' ? 'Origin' : 'Destination';
					return (
						<Button
							themeType="secondary"
							className={styles.tag_wrapper}
							onClick={() => onClick(service)}
						>
							<div className={styles.details}>
								Select
								{' '}
								{tradeType}
								{' '}
								{upperCase(startCase(newShipmentType))}
								{' '}
								Preferences
							</div>
						</Button>
					);
				})}
		</div>
	);
}

export default Services;
