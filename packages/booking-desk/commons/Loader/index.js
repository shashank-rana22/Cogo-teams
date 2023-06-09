import { Placeholder } from '@cogoport/components';

import NUMERICAL_VALUES from '../../config/NUMERICAL_VALUES.json';

import styles from './styles.module.css';

function Card() {
	return (
		<div className={styles.card}>
			<div className={styles.shipment_info}>
				<Placeholder className={styles.loader} />
			</div>

			<div className={styles.separator} />

			<div className={styles.port_details}>
				<Placeholder type="circle" radius="50px" />
				<Placeholder className={styles.loader} />

				<Placeholder className={styles.loader} />
			</div>

			<div className={styles.separator} />

			<div className={styles.cargo_details}>
				<Placeholder className={styles.loader} />
			</div>
		</div>
	);
}

export default function Loader() {
	return Array(NUMERICAL_VALUES.four).fill(null).map(() => <Card key={Math.random()} />);
}
