import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import getTimeLineText from '../../../../../../../utils/getTimeLineText';

import styles from './styles.module.css';

function TimeLine({ createdAt, type, description, ticketType }) {
	const timelineText = getTimeLineText({
		type,
		ticketType,
	});

	if (!timelineText) {
		return null;
	}

	return (
		<div className={styles.container} key={description}>
			<div className={styles.timeline_text}>
				<div className={styles.timeline_container}>
					{formatDate({
						date       : createdAt,
						formatType : 'dateTime',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						separator  : ' ',
					})}
				</div>
				<div className={styles.timeline_container}>{timelineText}</div>
			</div>
			<div className={styles.break_the_chat} />
		</div>
	);
}

export default TimeLine;
