import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

export default function EmptyState() {
	return (
		<div className={styles.container}>
			<div>
				<h1 className={styles.header}>No Shipments found !!</h1>
				<h3>Looks like no results were found...</h3>
			</div>

			<img
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				alt="empty_page"
				height="50%"
				width="50%"
			/>
		</div>
	);
}
