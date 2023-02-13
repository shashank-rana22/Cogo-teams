import { Pill } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function StatusName({ itemData }) {
	const { userIncidentStatus } = itemData || {};
	return (
		<div className={styles.container}>
			{userIncidentStatus === 'DELETED' || userIncidentStatus === 'RAISED_AGAIN'
				? (
					<Pill color="#FEF199">
						{userIncidentStatus}
					</Pill>
				)

				: (
					<Pill color="#CFEAED">
						{userIncidentStatus}
					</Pill>
				)}
		</div>
	);
}

export default StatusName;
