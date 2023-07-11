import { Placeholder } from '@cogoport/components';
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.css';

const PLACEHOLDER_COUNT = 4;

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
	return Array(PLACEHOLDER_COUNT).fill(null).map(() => <Card key={uuidv4()} />);
}
