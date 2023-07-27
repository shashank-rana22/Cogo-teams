import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function PocUser() {
	return (
		<div className={styles.container}>
			PocUser
			<Image
				src={GLOBAL_CONSTANTS.image_url.message_reply}
				height={25}
				width={25}
				alt="message"
			/>
		</div>
	);
}

export default PocUser;
