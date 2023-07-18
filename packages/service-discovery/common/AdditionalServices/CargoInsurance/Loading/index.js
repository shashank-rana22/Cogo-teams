import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.loader_wrapper}>
			<strong className={styles.text}>Please wait while we fetch Details!!</strong>
			<img
				src={GLOBAL_CONSTANTS.image_url.cargo_insurance_loader}
				alt=" loading details"
				width={45}
				height={45}
			/>
		</div>
	);
}
export default Loading;
