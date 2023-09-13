import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = 'No Records Found',
	flexDirection = 'row',
	textSize = '16px',
	showImage = true,
}) {
	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`} style={{ minHeight: height }}>
			{showImage
			&& (
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_state}
					width={width}
					height={height}
					alt="Empty-state-img"
					style={{ margin: '12px' }}
				/>
			)}

			<div className={styles.text} style={{ fontSize: textSize }}>{emptyText}</div>
		</div>

	);
}

export default EmptyState;
