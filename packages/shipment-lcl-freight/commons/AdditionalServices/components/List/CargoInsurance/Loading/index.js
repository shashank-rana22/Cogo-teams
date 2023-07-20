import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.modules.css';

function Loading() {
	return (
		<section className={styles.loader_wrapper}>
			<span className={styles.text}>Please wait while we fetch Details!!</span>
			{' '}
			<img
				src={GLOBAL_CONSTANTS.image_url.cargo_insurance_loader}
				alt=" loading details"
			/>
		</section>
	);
}
export default Loading;
