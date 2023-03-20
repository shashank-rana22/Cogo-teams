import { Tooltip } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';

import { getDate } from '../utils/formatters';

import {
	container, connecting_line, circle, small, big, deviated,
	display_milestone, completed, ellipsis, tooltip_content, label, value,
} from './styles.module.css';

export default function TimelineItem({ item, isLast = false, consecutivelyCompleted = false }) {
	const { milestone, is_sub, completed_on, actual_completed_on } = item || {};

	let isCompleted = !!completed_on && consecutivelyCompleted;
	isCompleted = isLast ? !!completed_on : isCompleted;

	const circleClass = `${circle} ${is_sub ? small : big} ${isCompleted ? completed : ''}`;
	const connectingLineClass = `${connecting_line} ${isCompleted ? completed : ''}`;

	const tooltipContent = (
		<div className={tooltip_content}>
			<div className={label}>Milestone</div>
			<div className={value}>{milestone}</div>

			{completed_on ? (
				<>
					<div className={label}>Completed On</div>
					<div className={value}>{getDate(completed_on)}</div>
				</>
			) : null}

			{actual_completed_on ? (
				<>
					<div className={`${label} ${deviated}`}>Actual Completed On</div>
					<div className={value}>{getDate(actual_completed_on)}</div>
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
					<div className={ellipsis}>{getDate(completed_on, 'dd MMM yyyy')}</div>
				</div>
			) : null}
		</div>
	);
}
