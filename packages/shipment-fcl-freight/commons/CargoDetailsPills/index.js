import React from 'react';

import { renderValue } from './renderValue';
import styles from './styles.module.css';

const labels = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
	'trip_type',
	'lr_number',
];

/**
 * Renders a CargoDetails Component
 * @param {Object}      					props
 * @param {Array of Object} 				[props.detail=[{}]] - Specifies details of cargo
 */
function CargoDetailsPills({ detail = {} }) {
	return (
		<>
			{labels.map((label) => {
				if (detail[label] && renderValue(label, detail)) {
					return (
						<div className={styles.box} key={label}>
							{renderValue(label, detail)}
						</div>
					);
				}

				return null;
			})}
		</>
	);
}
export default CargoDetailsPills;
