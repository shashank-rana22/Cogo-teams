import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Card({ card = {} }) {
	const { supplier_name, potential, capability, rates_added } = card;

	return (
		<div>
			<div className={styles.row}>
				<div className={styles.supplier_name}>{supplier_name}</div>
				<div className={styles.potential}>{potential}</div>
				<div className={styles.capability}>{capability}</div>
				<div className={styles.rates_added}>{rates_added}</div>
				<div className={styles.ask_for_rates}>
					<Button
						size="md"
						themeType="secondary"
					>
						Ask For rates
					</Button>
				</div>

			</div>
		</div>

	);
}

export default Card;
