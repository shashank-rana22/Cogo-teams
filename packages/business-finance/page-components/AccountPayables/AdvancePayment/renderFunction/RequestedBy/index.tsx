import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function RequestedBy({ itemData }) {
	const { reuestedByDate, reuestedByName } = itemData || {};
	return (
		<div className={styles.count}>
			{reuestedByName}
			<div className={styles.date}>
				On
				{' '}
				{format(reuestedByDate, 'hh:mm a, dd MMM yyyy')}
			</div>
		</div>
	);
}

export default RequestedBy;
