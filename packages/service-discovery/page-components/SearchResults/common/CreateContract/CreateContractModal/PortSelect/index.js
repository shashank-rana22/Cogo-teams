import { startCase } from '@cogoport/utils';
import React from 'react';

import LocationDetails from '../../../../../../common/LocationDetails';

import styles from './styles.module.css';

function PortSelect({ portDetail = {} }) {
	const {
		// origin_port = {},
		// destination_port = {},
		container_type,
		container_size,
		commodity,
		// origin_airport,
		// destination_airport,
		// volume,
		// weight,
		// inco_term,
		// trade_type,
	} = portDetail || {};

	return (
		<div className={styles.container}>
			<LocationDetails data={portDetail} />

			<div className={styles.load_details}>
				{container_size ? (
					<span className={styles.load_item}>
						{container_size === '20' || container_size === '40'
							? `${container_size}ft`
							: container_size}
					</span>
				) : null}

				{container_type ? (
					<span className={styles.load_item}>{startCase(container_type)}</span>
				) : null}

				<span className={styles.load_item}>
					{startCase(commodity) || 'All Commodities'}
				</span>
			</div>
		</div>
	);
}

export default PortSelect;
