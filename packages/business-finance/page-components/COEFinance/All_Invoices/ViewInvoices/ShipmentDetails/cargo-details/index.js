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
	'truck_types',
	'awb_execution_date',
	'is_minimum_price_shipment',
	'price_type',
	'delivery_date',
	'container_load_type',
	'payment_term',
	'contract_reference_id',
	'bl_category',
];

/**
 * Renders a CargoDetails Component
 * @param {Object}      					props
 * @param {Array of Object} 				[props.detail=[{}]] - Specifies details of cargo
 */

function CargoDetails({ detail }) {
	return (
		<div className={styles.div_container}>
			{labels.map((label) => {
				if (
					detail?.[label]
          && renderValue(label, detail)
				) {
					return (
						<div className={styles.container} key={label}>
							<div className={`${styles.box} cargo-detail-pill`} key={label}>
								{renderValue(label, detail)}
							</div>
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}
export default CargoDetails;
