import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function PercentageChange({
	percentageChanged = 0,
}) {
	return (
		<div
			className={cl`${styles.percentage_change} ${cl.ns('percentage_view')}`}
			style={{ color: percentageChanged > 0 ? '#849E4C' : '#EE3425' }}
		>
			{percentageChanged !== 0
				? `${percentageChanged > 0 ? `+${percentageChanged}` : percentageChanged}%`
				: ''}
		</div>
	);
}

export default PercentageChange;
