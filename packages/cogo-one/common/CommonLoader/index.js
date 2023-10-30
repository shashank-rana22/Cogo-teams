import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function CommonLoader() {
	return (
		<div className={styles.flex_div}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
				type="video/gif"
				alt="loading"
				width={100}
				height={100}
			/>
		</div>
	);
}

export default CommonLoader;
