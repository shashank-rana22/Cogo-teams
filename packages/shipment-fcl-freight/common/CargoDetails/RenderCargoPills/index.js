import { cl } from '@cogoport/components';

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
	'payment_term',
	'container_load_type',
	'contract_reference_id',
];

/**
 * Renders a CargoDetails Component
 * @param {Object}      					props
 * @param {Array of Object} 				[props.detail=[{}]] - Specifies details of cargo
 */
function RenderCargoPills({ detail }) {
	return (
		<>
			{labels.map((label) => {
				const value = renderValue(label, detail);
				if (detail?.[label] && value) {
					return (
						<div className={cl` ${styles.box} `} key={label}>
							{value}
						</div>
					);
				}

				return null;
			})}
		</>
	);
}
export default RenderCargoPills;
