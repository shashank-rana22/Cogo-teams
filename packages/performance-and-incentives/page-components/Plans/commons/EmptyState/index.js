import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = '',
	flexDirection = 'row',
	textSize = '16px',
}) {
	const emptyValue = emptyText || 'Data not found';

	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`}>
			<img
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={width}
				height={height}
				alt="Empty-state"
				style={{ margin: '10px' }}
			/>

			<div className={styles.text} style={{ fontSize: textSize }}>{emptyValue}</div>
		</div>

	);
}

export default EmptyState;
