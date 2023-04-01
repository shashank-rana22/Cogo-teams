import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<section className={styles.card}>
			<div className={styles.left_header}>
				<Placeholder height="20px" />
			</div>

			<div className={styles.card_body}>
				{[0, 1, 2].map((num) => (
					<div className={styles.card_item} key={num}>
						<div className={styles.item_label}>
							<Placeholder height="20px" />
						</div>
						<div className={styles.item_value}>
							<Placeholder height="28px" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default LoadingState;
