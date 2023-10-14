import { format, getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DateName({ itemData }) {
	const { updatedAt } = itemData;
	const [date, time] = updatedAt?.split(' ') || [];
	const [day, month, year] = date.split('-');
	const reversedDate = `${year}-${month}-${day} ${time}`;
	return (
		<div className={styles.container}>
			<div>
				{startCase(getByKey(itemData, 'updatedBy.name') as string)}
			</div>
			<div>{format(reversedDate, 'dd MMM YYYY hh:mm a', {}, false)}</div>
		</div>
	);
}

export default DateName;
