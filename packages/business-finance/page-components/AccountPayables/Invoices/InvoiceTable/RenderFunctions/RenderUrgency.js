import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

export function RenderUrgency({ itemData, field = {} }) {
	return (getByKey(itemData, field?.key)?.[GLOBAL_CONSTANTS.zeroth_index]
		? (
			<div className={styles.urgency}>
				{startCase(getByKey(itemData, field?.key)?.[GLOBAL_CONSTANTS.zeroth_index])}
			</div>
		) : '-'
	);
}
