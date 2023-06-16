import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function TextSection() {
	return (
		<div className={styles.container}>
			<div className={styles.back_button}><IcMArrowBack /></div>
			<div className={styles.text}>Discover Rates</div>
		</div>
	);
}

export default TextSection;
