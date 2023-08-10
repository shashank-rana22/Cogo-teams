import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const DATES = [
	{ label: 'Due Date', key: 'payableDueDate', bold: true },
	{ label: 'Invoice Date', key: 'billDate' },
	{ label: 'Upload Date', key: 'uploadBillDate' },
];

export function RenderInvoiceDates({ itemData }) {
	return (
		<div>
			{DATES.map((date) => (
				<div className={date?.bold ? styles?.bold : ''} key={date?.key}>
					<span>{date?.label}</span>
					<span className={styles.val}>
						:
						{formatDate({
							date       : getByKey(itemData, date?.key),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</span>
				</div>
			))}
		</div>
	);
}
