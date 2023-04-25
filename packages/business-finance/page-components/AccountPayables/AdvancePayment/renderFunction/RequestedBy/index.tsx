import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function RequestedBy({ itemData }) {
	const { requestedAt, requestedBy } = itemData || {};
	const { name } = requestedBy || {};
	return (
		<div className={styles.count}>
			{name}
			<div className={styles.date}>
				On
				{' '}
				{format(requestedAt, 'hh:mm a, dd MMM yyyy')}
			</div>
		</div>
	);
}

export default RequestedBy;
