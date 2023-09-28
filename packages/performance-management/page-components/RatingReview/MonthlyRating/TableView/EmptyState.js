import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

export default function EmptyState() {
	return (
		<div className={styles.container}>
			<div>
				<h2 className={styles.header}>No Employee found !!</h2>
				<h3>Looks like no results were found...</h3>
			</div>

			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<img
					src={GLOBAL_CONSTANTS.image_url.list_empty}
					alt="empty_page"
					height="25%"
					width="25%"
				/>
			</div>
		</div>
	);
}
