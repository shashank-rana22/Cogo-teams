import { Pill } from '@cogoport/components';

import styles from './styles.module.css';

function LineItems({ item }) {
	return (
		<div className={styles.line_item_values}>
			<div className={styles.value}>
				<div className={styles.text}>Total Line-items: </div>
				<Pill>
					{' '}
					{item.total_line_items}
				</Pill>
			</div>
			<div className={styles.value}>
				<div className={styles.text}>Line-items Locked: </div>
				<Pill>{item.locked_line_items}</Pill>
			</div>
			<div className={styles.value}>
				<div className={styles.text}>Invoices Uploaded: </div>
				<Pill>{item.invoices_uploaded}</Pill>
			</div>
		</div>
	);
}
export default LineItems;
