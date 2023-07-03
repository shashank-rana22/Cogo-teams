import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADER_COUNT_FOR_SHIPMENTS = 10;

function Card() {
	return (
		<div className={styles.card}>

			<div className={styles.head_loader}>
				<Placeholder />
			</div>

			<div className={styles.body_loader}>
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
		</div>
	);
}

export default function Loader() {
	return [...Array(LOADER_COUNT_FOR_SHIPMENTS).keys()].map((key) => <Card key={key} />);
}
