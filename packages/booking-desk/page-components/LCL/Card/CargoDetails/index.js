import { Pill } from '@cogoport/components';
import { startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

const labels = [
	'commodity',
	'inco_term',
	'weight',
	'volume',
];

const renderValue = (label, value, allDetails) => {
	switch (label) {
		case 'commodity': {
			return startCase(value);
		}
		case 'inco_term': {
			return `Inco - ${upperCase(value)}`;
		}
		case 'weight': {
			return `${value} kgs`;
		}
		case 'volume': {
			return ` ${value} cbm ${`, Chargeable Weight: ${Math.max(
				value * 166.67,
				allDetails?.weight,
			).toFixed(2)} kg`}`;
		}
		default: {
			return '';
		}
	}
};

export default function CargoDetails({ cargo_details }) {
	return (
		<div className={styles.cargo_details_container}>
			{labels.map((label) => (cargo_details[label]
				? (
					<Pill size="sm" key={label}>
						{renderValue(label, cargo_details[label], cargo_details)}
					</Pill>
				)
				: null))}
		</div>
	);
}
