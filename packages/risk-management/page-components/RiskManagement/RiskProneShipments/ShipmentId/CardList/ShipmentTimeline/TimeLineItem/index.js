import { Tooltip } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import {
	container, connecting_line, circle, big,
	display_milestone, completed, ellipsis, tooltip_content, label, value,
} from './styles.module.css';

function TimelineItem({ item, isLast, consecutivelyCompleted = false }) {
	const { milestone, is_sub, completed_on } = item || {};

	const displayCompletedDate = completed_on;

	let isCompleted = !!completed_on && consecutivelyCompleted;
	isCompleted = isLast ? !!completed_on : isCompleted;

	const circleClass = `${circle} ${big} ${isCompleted ? completed : ''}`;
	const connectingLineClass = `${connecting_line} ${isCompleted ? completed : ''}`;

	const tooltipContent = (
		<div className={tooltip_content}>
			<div className={label}>Milestone</div>
			<div className={value}>{milestone}</div>

			{displayCompletedDate ? (
				<>
					<div className={label}>Completed On</div>
					<div className={value}>
						{displayCompletedDate !== null
						&& format(displayCompletedDate, 'dd MMM yyyy')}
					</div>
				</>
			) : null}
		</div>
	);
	return (
		<div className={container}>
			<Tooltip content={tooltipContent} placement="top" interactive>
				<div className={circleClass}>
					{isCompleted && !is_sub ? <IcMTick /> : null}
				</div>
			</Tooltip>

			{isLast ? null : <div className={connectingLineClass} />}

			<div className={display_milestone}>
				<div className={ellipsis}>{milestone}</div>
				{displayCompletedDate !== null
					&& <div className={ellipsis}>{format(displayCompletedDate, 'dd MMM yyyy')}</div>}
			</div>
		</div>
	);
}

export default TimelineItem;
