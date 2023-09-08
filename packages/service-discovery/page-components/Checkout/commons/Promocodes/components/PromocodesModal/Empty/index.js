import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function Empty() {
	return (
		<div className={styles.container}>
			<img
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				alt="empty-icon"
				width="100px"
				height="100px"
			/>
			<div className={styles.heading}>No Promocodes Available </div>
		</div>
	);
}

export default Empty;
