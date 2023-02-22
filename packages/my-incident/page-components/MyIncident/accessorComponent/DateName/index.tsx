import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DateName({ itemData }) {
	return (
		<div className={styles.container}>
			<div>
				{startCase(getByKey(itemData, 'updatedBy.name') as string)}
			</div>
			<div>
				{getByKey(itemData, 'updatedAt') as string}
			</div>
		</div>
	);
}

export default DateName;
