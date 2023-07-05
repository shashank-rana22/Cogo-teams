import { IcMVerySad } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.Container}>
			<IcMVerySad style={{ height: '60px', width: '60px' }} />
			<div className={styles.Text}>We are extremely sorry!!</div>
			<div className={styles.Text}>
				We are unable to fetch tracking details for this shipment.
			</div>
		</div>
	);
}

export default EmptyState;
