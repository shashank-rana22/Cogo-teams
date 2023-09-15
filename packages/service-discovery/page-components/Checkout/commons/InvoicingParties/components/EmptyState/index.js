import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 125,
	bottomText = 'No Data Found',
}) {
	return (
		<div className={styles.container}>
			<img
				height={height}
				width={width}
				alt="empty state"
				src={GLOBAL_CONSTANTS.image_url.ip_empty_state_s2c_png}
			/>

			<div className={styles.bottom_text}>{bottomText}</div>
		</div>
	);
}

export default EmptyState;
