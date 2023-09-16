import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<h1>No Result Found</h1>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				alt="empty-state"
				width={600}
				height={400}
			/>
		</div>
	);
}
export default EmptyState;
