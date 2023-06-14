import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const { nodata_image: NODATA_IMAGE } = GLOBAL_CONSTANTS.image_url || {};

function EmptyStateDocs({ text = 'No Data Found' }) {
	return (
		<div className={styles.container}>
			<img
				className={styles.img_height}
				src={NODATA_IMAGE}
				alt="No Data"
				height="240px"
				width="180px"

			/>
			<div>{text}</div>
		</div>
	);
}
export default EmptyStateDocs;
