import React from 'react';

import { renderValue } from './renderValue';
import styles from './styles.module.css';

const labels = [
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
	const isFTL = detail?.shipment_type === 'ftl_freight';
	const COMMODITY = 'commodity';
	return (
		<div className={styles.shipment_details}>
			{labels.map((label) => {
				if (label === COMMODITY && !detail?.[label] && isFTL) {
					return (
						<div className={styles.chips} key={label}>
							General
						</div>
					);
				}
				if (detail?.[label] && renderValue({ label, detail })) {
					return (
						<div className={styles.chips} key={label}>
							{renderValue({ label, detail })}
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}
export default CargoDetails;
