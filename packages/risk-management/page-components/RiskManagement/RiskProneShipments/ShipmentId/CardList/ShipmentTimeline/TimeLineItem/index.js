import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import {
	container, connecting_line, circle, big,
	display_milestone, completed, ellipsis, tooltip_content, label, value,
} from './styles.module.css';

function TimelineItem({ item = {}, isLast = '', consecutivelyCompleted = false }) {
	const { milestone, completed_on } = item;
	let isCompleted = !!completed_on && consecutivelyCompleted;
	isCompleted = isLast ? !!completed_on : isCompleted;

	const circleClass = `${circle} ${big} ${isCompleted ? completed : ''}`;
	const connectingLineClass = `${connecting_line} ${isCompleted ? completed : ''}`;

	function TooltipContent() {
		return (
			<div className={tooltip_content}>
				<div className={label}>Milestone</div>
				<div className={value}>{milestone}</div>

				{completed_on ? (
					<>
						<div className={label}>Completed On</div>
						<div className={value}>
							{completed_on !== null
				&& formatDate({
					date       : completed_on,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					formatType : 'dateTime',
					separator  : ' | ',
				})}
						</div>
					</>
				) : null}
			</div>
		);
	}
	return (
		<div className={container}>
			<Tooltip content={<TooltipContent />} placement="top" interactive>
				<div className={circleClass}>
					{isCompleted ? <IcMTick /> : null}
				</div>
			</Tooltip>

			{isLast ? null : <div className={connectingLineClass} />}

			<div className={display_milestone}>
				<div className={ellipsis}>{milestone}</div>
				{isEmpty(completed_on) ? null
					: (
						<div className={ellipsis}>
							{formatDate({
								date       : completed_on,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							})}
						</div>
					)}
			</div>
		</div>
	);
}

export default TimelineItem;
