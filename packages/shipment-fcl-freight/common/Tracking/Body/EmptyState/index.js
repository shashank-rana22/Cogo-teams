import { cl } from '@cogoport/components';
import { IcMVerySad } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<IcMVerySad style={{ height: '60px', width: '60px' }} />
			<div className={styles.text}>We are extremely sorry!!</div>
			<div className={cl`${styles.text} ${styles.msg}`}>
				We are unable to fetch tracking details for this shipment.
			</div>
		</div>
	);
}

export default EmptyState;
