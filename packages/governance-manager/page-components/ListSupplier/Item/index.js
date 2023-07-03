import { Button, Pill } from '@cogoport/components';

import styles from './styles.module.css';

function Item() {
	return (
		<div className={styles.item}>
			<div>
				<div className={styles.key}>Supplier Name</div>
				<div className={styles.value}>Dragon City Private Limited</div>
			</div>
			<div>
				<div className={styles.key}>Home Country</div>
				<div className={styles.value}>Australia</div>
			</div>
			<div>
				<div className={styles.key}>Service Provided</div>
				<div className={styles.value}>
					FCL | LCL | Trucking &nbsp;
					<span className={styles.more}>+1 more</span>
				</div>
			</div>

			<div>
				<div className={styles.key}>Analysys Status</div>
				<div className={styles.value}>
					<Pill
						size="md"
						color="blue"
					>
						2/4 Services Needed
					</Pill>

				</div>
			</div>
			<div>
				<Button themeType="accent">
					View
				</Button>
			</div>

		</div>
	);
}

export default Item;
