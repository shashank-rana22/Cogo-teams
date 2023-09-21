import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState({
	height = 400,
	width = 600,
	emptyText = 'Data not found',
	flexDirection = 'row',
	textSize = '16px',
	marginTop = '0px',
}) {
	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`} style={{ marginTop }}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={width}
				height={height}
				alt="Empty-state"
				style={{ margin: '10px' }}
			/>
			<div className={styles.text} style={{ fontSize: textSize }}>{emptyText}</div>
		</div>

	);
}

export default EmptyState;
