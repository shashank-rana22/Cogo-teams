import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = 'Data not found',
	flexDirection = 'row',
	textSize = '16px',
}) {
	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={width}
				height={height}
				alt="Empty-state"
				style={{ margin: '10' }}
			/>

			<div className={styles.text} style={{ fontSize: textSize }}>{emptyText}</div>
		</div>
	);
}

export default EmptyState;
