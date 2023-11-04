import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState({ emptyText = 'Data not found' }) {
	return (
		<div className={styles.container}>
			<div className={styles.image_box}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_state}
					fill
					alt="Empty-state"
					style={{ margin: '10px', objectFit: 'contain' }}
				/>
			</div>
			<div className={styles.text}>{emptyText}</div>
		</div>
	);
}

export default EmptyState;
