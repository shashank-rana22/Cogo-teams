import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

export default function EmptyState() {
	return (
		<section className={styles.container}>
			<div className={styles.empty_state_text}>
				<h1 className={styles.header}>No Shipments found !!</h1>
				<h3>Looks like no results were found...</h3>
			</div>

			<img
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				alt="emptyPage"
				height="50%"
				width="50%"
			/>
		</section>
	);
}
