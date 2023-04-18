import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ApprovedBy({ itemData }) {
	const { approvedAt, approvedBy } = itemData || {};
	return (
		<div className={styles.count}>
			{approvedBy}
			<div className={styles.date}>
				On
				{' '}
				{format(approvedAt, 'hh:mm a, dd MMM yyyy')}
			</div>
		</div>
	);
}

export default ApprovedBy;
