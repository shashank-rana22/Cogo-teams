import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const { zeroth_index } = GLOBAL_CONSTANTS || {};

export function RenderUrgency({ itemData, field = {} }) {
	return (getByKey(itemData, field?.key)?.[zeroth_index]
		? (
			<div className={styles.urgency}>
				{startCase(getByKey(itemData, field?.key)?.[zeroth_index])}
			</div>
		) : '-'
	);
}
