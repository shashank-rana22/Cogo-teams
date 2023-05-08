import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function TooltipContent({ organization = [] }) {
	return (
		<div className={styles.container}>
			{(organization || []).map((item) => <div className={styles.business_name}>{startCase(item)}</div>)}
		</div>
	);
}

export default TooltipContent;
