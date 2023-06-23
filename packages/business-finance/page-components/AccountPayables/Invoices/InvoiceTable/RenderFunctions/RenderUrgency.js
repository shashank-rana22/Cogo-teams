import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const FIRST_ELE = 0;

export function RenderUrgency({ itemData, field = {} }) {
	return (getByKey(itemData, field?.key)?.[FIRST_ELE]
		? (
			<div className={styles.urgency}>
				{startCase(getByKey(itemData, field?.key)?.[FIRST_ELE])}
			</div>
		) : '-'
	);
}
