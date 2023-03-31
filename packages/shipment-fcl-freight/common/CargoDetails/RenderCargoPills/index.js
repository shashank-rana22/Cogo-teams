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
	'packages',
	'volume',
	'weight',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
	'payment_term',
	'container_load_type',
	'contract_reference_id',
];

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
