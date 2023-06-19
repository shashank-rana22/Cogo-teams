import { renderValue } from './renderValue';
import styles from './styles.module.css';

const LABELS = [
	'airline',
	'commodity',
	'inco_term',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'source',
	'price_type',
	'cargo_readiness_date',
	'is_minimum_price_shipment',
	'master_airway_bill_number',
	'house_airway_bill_number',
];

function RenderCargoPills({ detail }) {
	return (
		<>
			{LABELS.map((label) => {
				const value = renderValue(label, detail);
				if (detail?.[label] && value) {
					return (
						<div className={styles.box} key={label}>
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
