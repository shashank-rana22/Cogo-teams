import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				alt="exmpty-state"
				width={240}
				height={180}
			/>
			<div className={styles.text}>No Data Found</div>
		</div>
	);
}

export default EmptyState;
