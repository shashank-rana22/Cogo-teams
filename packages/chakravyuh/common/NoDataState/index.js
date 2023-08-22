import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function NoDataState({
	height = 125,
	width = 225,
	emptyText = 'Data Not Found',
	flow = 'row',
	textSize = 'lg',
	visible = true,
}) {
	if (!visible) {
		return null;
	}

	return (
		<div className={cl`${styles.container} ${styles[flow]}`}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_chart}
				width={width}
				height={height}
				className={styles.img}
				alt="Empty-state"
				style={{ margin: '10px' }}
			/>

			<div className={cl`${styles.text} ${styles[textSize]}`}>{emptyText}</div>
		</div>

	);
}

export default NoDataState;
