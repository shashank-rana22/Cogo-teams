import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function ComingSoon() {
	return (
		<div className={styles.container}>
			<img src={GLOBAL_CONSTANTS.image_url.general_icon} alt="coming_soon" />
		</div>
	);
}

export default ComingSoon;
