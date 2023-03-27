import { cl } from '@cogoport/components';

import { renderValue } from './renderValue';
import styles from './styles.module.css';

const labels = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trade_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
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
				if (detail?.[label] && renderValue(label, detail)) {
					return (
						<div className={cl` ${styles.box} `} key={label}>
							{renderValue(label, detail)}
						</div>
					);
				}

				return null;
			})}
		</>
	);
}
export default RenderCargoPills;
