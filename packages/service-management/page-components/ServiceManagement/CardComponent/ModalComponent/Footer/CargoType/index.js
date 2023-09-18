import { Chips } from '@cogoport/components';

import styles from './styles.module.css';

function CargoType({ cargo_types = [] }) {
	return (
		<div className={styles.flex}>
			<div className={styles.title}>Cargo Type</div>
			<Chips items={cargo_types.map((x) => ({ children: x.cargo_type }))} />
		</div>
	);
}

export default CargoType;
