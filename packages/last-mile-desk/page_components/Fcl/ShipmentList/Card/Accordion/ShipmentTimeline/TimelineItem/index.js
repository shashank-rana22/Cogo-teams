import { Tooltip } from '@cogoport/components';
import { format } from '@cogoport/utils';

import {
	container, connecting_line, circle, big,
	display_milestone, completed, ellipsis, tooltip_content, label, value, completed_line, date_style,
} from './styles.module.css';

const DATE_FORMAT = 'dd MMM yyyy';

function TooltipContent({ milestone = '', displayCompletedDate = '' }) {
	return (
		<div className={tooltip_content}>
			<div className={label}>Milestone</div>
			<div className={value}>{milestone}</div>

			{displayCompletedDate ? (
				<>
					<div className={label}>Completed On</div>
					<div className={value}>
						{displayCompletedDate !== null && format(displayCompletedDate, DATE_FORMAT)}
					</div>
				</>
			) : null}
		</div>
	);
}

function TimelineItem({ item = {}, isLast = false, consecutivelyCompleted = false }) {
	const { milestone, completed_on } = item || {};

	const displayCompletedDate = completed_on;

	let isCompleted = !!displayCompletedDate && consecutivelyCompleted;
	isCompleted = isLast ? !!displayCompletedDate : isCompleted;

	const circleClass = `${circle} ${big} ${isCompleted ? completed : ''}`;
	const connectingLineClass = `${connecting_line} ${isCompleted ? completed_line : ''}`;

	return (
		<div className={container}>
			<Tooltip
				content={(
					<TooltipContent
						milestone={milestone}
						displayCompletedDate={displayCompletedDate}
					/>
				)}
				placement="top"
				interactive
			>
				<div className={circleClass} />
			</Tooltip>

			{isLast ? null : <div className={connectingLineClass} />}

			<div className={display_milestone}>
				<div className={ellipsis}>{milestone}</div>
				{displayCompletedDate !== null
					&& <div className={date_style}>{format(displayCompletedDate, DATE_FORMAT)}</div>}
			</div>
		</div>
	);
}

export default TimelineItem;
