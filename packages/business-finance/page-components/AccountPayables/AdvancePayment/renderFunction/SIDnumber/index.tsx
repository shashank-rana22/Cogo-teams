import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function SIDnumber({ itemData }) {
	const { jobNumber = '', serviceType = '' } = itemData || {};
	return (
		<div>
			<div className={styles.text}>
				#
				{jobNumber || '-'}
			</div>
			<div>{startCase(serviceType || '-')}</div>
		</div>
	);
}

export default SIDnumber;
