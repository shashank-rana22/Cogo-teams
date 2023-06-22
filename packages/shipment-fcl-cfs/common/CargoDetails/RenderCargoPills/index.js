import { cl } from '@cogoport/components';

import { renderValue } from './renderValue';
import styles from './styles.module.css';

const LABELS = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trade_type',
	'packages',
	'volume',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'payment_term',
];

function RenderCargoPills({ detail }) {
	return (
		<>
			{LABELS.map((label) => {
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
