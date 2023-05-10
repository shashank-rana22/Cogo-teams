import { IcMTick } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

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
			<p>{format(timelineItem.date, 'dd MMM yyyy')}</p>
		</div>
	);
}
