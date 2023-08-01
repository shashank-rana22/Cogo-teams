import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function Communication() {
	return (
		<div className={styles.communication_container}>
			<img src={GLOBAL_CONSTANTS.image_url.comming_soon} alt="coming soon" />
		</div>
	);
}

export default Communication;
