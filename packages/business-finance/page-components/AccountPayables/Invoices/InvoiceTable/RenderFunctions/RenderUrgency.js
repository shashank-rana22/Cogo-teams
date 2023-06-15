import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

export function RenderUrgency({ itemData, field = {} }) {
	return (getByKey(itemData, field?.key)?.[0]
		? (
			<div className={styles.urgency}>
				{startCase(getByKey(itemData, field?.key)?.[0])}
			</div>
		) : '-'
	);
}
