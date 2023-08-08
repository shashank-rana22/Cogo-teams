import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const PLACEHOLDER_ITEM_COUNT = 5;

const Card = (
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

export default function Loader() {
	return Array(PLACEHOLDER_ITEM_COUNT).fill(null).map(() => Card);
}
