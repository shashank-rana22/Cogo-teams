import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ApprovedBy({ itemData }) {
	const { approvedByDate, approvedByName } = itemData || {};
	return (
		<div className={styles.count}>
			{approvedByName}
			<div className={styles.date}>
				On
				{' '}
				{format(approvedByDate, 'hh:mm a, dd MMM yyyy')}
			</div>
		</div>
	);
}

export default ApprovedBy;
