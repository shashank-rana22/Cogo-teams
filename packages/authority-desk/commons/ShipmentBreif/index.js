import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ShipmentBreif({ item }) {
	return (
		<div className={styles.container}>
			<div className={styles.serial_id}>
				SID #
				{' '}
				{item?.serial_id}
			</div>
			<div className={styles.created_at}>
				Created On
				{ ' '}
				{format(item?.created_at, 'dd MMM yyyy', {}, false)}
			</div>

		</div>
	);
}

export default ShipmentBreif;
