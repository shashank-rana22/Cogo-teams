import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const ZERO = 0;

export function RenderUrgency({ itemData, field = {} }) {
	return (getByKey(itemData, field?.key)?.[ZERO]
		? (
			<div className={styles.urgency}>
				{startCase(getByKey(itemData, field?.key)?.[ZERO])}
			</div>
		) : '-'
	);
}
