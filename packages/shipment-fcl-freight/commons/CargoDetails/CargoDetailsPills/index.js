import React from 'react';

import { renderValue } from './renderValue';
import styles from './styles.module.css';

const labels = [
	'airline',
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'master_airway_bill_number',
	'house_airway_bill_number',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
	'truck_type',
	'trip_type',
	'lr_number',
];

function CargoDetailsPills({ detail }) {
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
