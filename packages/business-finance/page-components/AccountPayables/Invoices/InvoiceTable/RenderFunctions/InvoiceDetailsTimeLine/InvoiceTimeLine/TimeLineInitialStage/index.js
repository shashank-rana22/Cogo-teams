import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from '../styles.module.css';

const PAID_STATUS = ['FULL', 'OVERPAID'];

function TimeLineInitialStage({ loading, data, dateWithTimeForPaymentDueDate, timeLine }) {
	const { zeroth_index } = GLOBAL_CONSTANTS || {};

	if (loading) {
		return (
			<Placeholder
				height="35px"
				width="35px"
				className="circle"
				margin="10px 0px 0px"
			/>
		);
	}

	if (isEmpty(data)) {
		return <div>TimeLine Does Not Exist</div>;
	}

	return (
		<div className={styles.subcontainer}>
			{PAID_STATUS.includes(timeLine[zeroth_index]?.eventName) ? null : (
				<div className={styles.datecontainer}>
					{dateWithTimeForPaymentDueDate[zeroth_index]}
					<div>
						{formatDate({
							date       : (new Date(timeLine[zeroth_index]?.paymentDueDate)),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
							separator  : '/',
						})}
					</div>
				</div>
			)}
			<div className={styles.dullcircle} />
			{PAID_STATUS.includes(timeLine[zeroth_index]?.eventName) ? null : (
				<div className={styles.eventcontainer}>PAYMENT DUE</div>
			)}
		</div>
	);
}

export default TimeLineInitialStage;
