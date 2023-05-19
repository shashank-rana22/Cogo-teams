import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import styles from './styles.module.css';

function AmendmentReasons({ invoice = {} }) {
	console.log(invoice?.amendment_requested_by, " :");
	const date = formatDate({
		date       : invoice?.amendment_requested_by?.date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});
	const time = formatDate({
		date       : invoice?.amendment_requested_by?.date,
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm aaa'],
		formatType : 'time',
	});

	const details = [
		{ label: 'Name', value: invoice?.amendment_requested_by?.name },
		{ label: 'Date', value: date || '-' },
		{ label: 'Time', value: time || '-' },
	];

	return (
		<div className={styles.popover_container}>
			<div className={styles.flex_row}>
				{details.map((item) => (
					<div key={item?.value}>
						<div className={styles.title}>{item?.label}</div>
						<div className={styles.value}>{item?.value}</div>
					</div>
				))}
			</div>

			<div className={styles.reasons}>
				<div className={styles.title}>Amendment Reason</div>

				<div className={styles.value}>
					{invoice?.amendment_detail?.amendment_reason}
					{' - '}
					{invoice?.amendment_detail?.amendment_subreason}
				</div>
			</div>
		</div>
	);
}

export default AmendmentReasons;
