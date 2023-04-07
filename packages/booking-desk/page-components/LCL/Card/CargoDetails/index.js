import { Pill } from '@cogoport/components';

import { renderValue } from './renderCargoValue';
import styles from './styles.module.css';

const labels = ['commodity', 'inco_term', 'weight', 'volume'];

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
