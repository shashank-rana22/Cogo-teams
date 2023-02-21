import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function BackButton() {
	return (
		<div>
			<button className={styles.btn}>
				<IcMArrowBack />
				<div className={styles.backer}>
					Back to Dashboard
				</div>
			</button>
		</div>
	);
}

export default BackButton;
