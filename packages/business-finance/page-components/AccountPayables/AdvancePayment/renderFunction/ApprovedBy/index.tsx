import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ApprovedBy({ itemData }) {
	const { approvedAt, approvedBy } = itemData || {};
	const { name } = approvedBy || {};
	return (
		<div className={styles.count}>
			{name}
			<div className={styles.date}>
				On
				{' '}
				{format(approvedAt, 'hh:mm a, dd MMM yyyy')}
			</div>
		</div>
	);
}

export default ApprovedBy;
