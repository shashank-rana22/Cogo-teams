import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey, startCase } from '@cogoport/utils';
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
				{startCase(getByKey(itemData, 'updatedBy.name'))}
			</div>
			<div>
				{reversedDate
					? formatDate({
						date: reversedDate,
						dateFormat:
								GLOBAL_CONSTANTS.formats.date['dd MMM YYYY'],
						timeFormat:
								GLOBAL_CONSTANTS.formats.time['hh:mm a'],
						formatType : 'dateTime',
						separator  : ' ',
					})
					: '-'}
			</div>
		</div>
	);
}

export default DateName;
