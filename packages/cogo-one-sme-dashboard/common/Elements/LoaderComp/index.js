import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function LoaderComp() {
	return (
		<div className={styles.loading_container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.preloader}
				height={250}
				width={250}
				alt="loading"
			/>
		</div>
	);
}

export default LoaderComp;
