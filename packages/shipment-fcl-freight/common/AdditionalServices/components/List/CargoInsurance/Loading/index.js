import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.loader_wrapper}>
			<div className={styles.text}>Please wait while we fetch Details!!</div>
			{' '}
			<img
				src={GLOBAL_CONSTANTS.image_url.cargo_insurance_loader}
				alt=" loading details"
			/>
		</div>
	);
}
export default Loading;
