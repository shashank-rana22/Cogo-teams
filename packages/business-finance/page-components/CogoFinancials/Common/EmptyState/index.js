import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState({
	height = 150,
	width = 225,
	emptyText = 'Data not found',
	flexDirection = 'row',
}) {
	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={width}
				height={height}
				alt="Empty-state"
				className={styles.margintop}
			/>

			<div className={styles.text}>{emptyText}</div>
		</div>

	);
}

export default EmptyState;
