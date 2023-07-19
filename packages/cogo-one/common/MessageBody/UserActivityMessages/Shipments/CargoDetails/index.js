import React from 'react';

import { RENDER_VALUE_MAPPING, serviceDetails } from '../../../../../utils/detailsHelperFuncs';

import styles from './styles.module.css';

const LABELS = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'trade_type',
	'cargo_weight_per_container',
	'volume',
	'weight',
];

function CargoDetails({ detail = {} }) {
	const details = serviceDetails({ detail });

	return (
		<div className={styles.shipment_details}>
			{(LABELS || []).map((label) => {
				const value = RENDER_VALUE_MAPPING[label]?.(details) || details[label] || '';

				if (!value || !detail?.[label]) {
					return null;
				}

				if (detail?.[label]) {
					return (
						<div className={styles.chips} key={label}>
							{value}
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}
export default CargoDetails;
