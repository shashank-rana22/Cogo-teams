import { format, getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DateName({ itemData }) {
	const { updatedAt } = itemData;
	return (
		<div className={styles.container}>
			<div>
				{startCase(getByKey(itemData, 'updatedBy.name') as string)}
			</div>
			<div>

				{format(updatedAt, 'dd MMM YYYY hh:mm a', {}, false)}

			</div>
		</div>
	);
}

export default DateName;
