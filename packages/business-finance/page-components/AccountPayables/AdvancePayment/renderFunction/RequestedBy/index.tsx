import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function RequestedBy({ itemData }) {
	const { requestedAt, requestedBy } = itemData || {};
	return (
		<div className={styles.count}>
			{requestedBy}
			<div className={styles.date}>
				On
				{' '}
				{format(requestedAt, 'hh:mm a, dd MMM yyyy')}
			</div>
		</div>
	);
}

export default RequestedBy;
