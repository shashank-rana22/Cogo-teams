import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Top() {
	return (
		<div className={styles.top}>
			Services & Users
			<div className={styles.btn}>
				<Button size="md" themeType="secondary">Add Service</Button>
				<Button size="md" themeType="accent">Add POC</Button>
			</div>
		</div>
	);
}

export default Top;
