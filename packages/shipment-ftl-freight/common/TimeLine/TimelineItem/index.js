import { Tooltip } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';

import { getDisplayDate } from '../utils/getDisplayDate';

import {
	container, connecting_line, circle, small, big, deviated,
	display_milestone, completed, ellipsis, tooltip_content, label, value,
} from './styles.module.css';

export default function TimelineItem({ item, isLast = false, consecutivelyCompleted = false }) {
	const { milestone, is_sub, completed_on, actual_completed_on } = item || {};

	const displayCompletedDate = completed_on;

	let isCompleted = !!completed_on && consecutivelyCompleted;
	isCompleted = isLast ? !!completed_on : isCompleted;

	const circleClass = `${circle} ${is_sub ? small : big} ${isCompleted ? completed : ''}`;
	const connectingLineClass = `${connecting_line} ${isCompleted ? completed : ''}`;

	const tooltipContent = (
		<div className={tooltip_content}>
			<div className={label}>Milestone</div>
			<div className={value}>{milestone}</div>

			{displayCompletedDate ? (
				<>
					<div className={label}>Completed On</div>
					<div className={value}>
						{getDisplayDate({ date: displayCompletedDate, formatType: 'dateTime' })}
					</div>
				</>
			) : null}

			{actual_completed_on ? (
				<>
					<div className={`${label} ${deviated}`}>Actual Completed On</div>
					<div className={value}>
						{getDisplayDate({ date: actual_completed_on, formatType: 'dateTime' })}
					</div>
				</>
			) : null}
		</div>
	);

	return (
		<div className={container}>
			<Tooltip content={tooltipContent} placement="bottom" interactive>
				<div className={circleClass}>
					{isCompleted && !is_sub ? <IcMTick /> : null}
				</div>
			</Tooltip>

			{isLast ? null : <div className={connectingLineClass} />}

			{!is_sub || isLast ? (
				<div className={display_milestone}>
					<div className={ellipsis}>{milestone}</div>
					<div className={ellipsis}>{getDisplayDate({ date: displayCompletedDate })}</div>
				</div>
			) : null}
		</div>
	);
}
