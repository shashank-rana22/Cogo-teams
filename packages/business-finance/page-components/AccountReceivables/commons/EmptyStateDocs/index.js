import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const NODATA_IMAGE = GLOBAL_CONSTANTS.image_url.nodata_image;

function EmptyStateDocs({ text = 'No Data Found' }) {
	return (
		<div className={styles.container}>
			<Image
				className={styles.img_height}
				src={NODATA_IMAGE}
				alt="No Data"
				height={240}
				width={180}

			/>
			<div>{text}</div>
		</div>
	);
}
export default EmptyStateDocs;
