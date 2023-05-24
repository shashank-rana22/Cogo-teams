import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

export default function TimelineItem({ timelineItem, isNextUpcoming }) {
	const isCompleted = timelineItem.date < new Date();

	let timelineItemClass = styles.timeline_item;
	timelineItemClass += ` ${isNextUpcoming ? styles.upcoming_date : ''}`;
	timelineItemClass += ` ${isCompleted ? styles.completed : ''}`;

	return (
		<div className={timelineItemClass}>
			<div className={styles.circle}>
				{isCompleted ? <IcMTick /> : null}
			</div>
			<div className={styles.connecting_line} />

			<p>{timelineItem.label}</p>
			<p>
				{formatDate({
					date       : timelineItem.date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</p>
		</div>
	);
}
