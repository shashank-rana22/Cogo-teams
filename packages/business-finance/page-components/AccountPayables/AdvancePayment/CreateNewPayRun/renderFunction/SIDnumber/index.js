import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function SIDnumber({ itemData }) {
	const { jobNumber, sid, serviceType } = itemData || {};
	return (
		<div>
			<div className={styles.text}>
				#
				{jobNumber || sid}
			</div>
			<div>{startCase(serviceType)}</div>
		</div>
	);
}

export default SIDnumber;
