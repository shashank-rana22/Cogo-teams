import { Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMTick } from '@cogoport/icons-react';
import { useContext } from 'react';

import { getDepartureArrivalDate } from '../utils/getDepartureArrivalDate';
import { getDisplayDate } from '../utils/getDisplayDate';

import {
	container, connecting_line, circle, small, big, deviated,
	display_milestone, completed, ellipsis, tooltip_content, label, value,
} from './styles.module.css';

export default function TimelineItem({
	item, isLast = false,
	consecutivelyCompleted = false, icd_milestones_to_show_completed = [],
}) {
	const { milestone, is_sub, completed_on, actual_completed_on } = item || {};

	const { primary_service } = useContext(ShipmentDetailContext) || {};

	const milestoneToDisplayDate = {
		'Vessel Departed From Origin (ETD)'   : getDepartureArrivalDate(primary_service, 'departure'),
		'Vessel Arrived At Destination (ETA)' : getDepartureArrivalDate(primary_service, 'arrival'),
	};

	const displayCompletedDate = milestoneToDisplayDate[item?.milestone] || completed_on;

	let isCompleted = (!!completed_on
		|| (icd_milestones_to_show_completed || []).includes(milestone))
		&& consecutivelyCompleted;

	isCompleted = isLast ? !!completed_on : isCompleted;

	const circleClass = `${circle} ${is_sub ? small : big} ${isCompleted ? completed : ''}`;
	const connectingLineClass = `${connecting_line} ${isCompleted ? completed : ''}`;

	const tooltipContent = (
		<div className={tooltip_content}>
			<div className={label}>Milestone</div>
			<div className={value}>{milestone}</div>

			{displayCompletedDate ? (
				<>
					<div className={label}>{isCompleted ? 'Completed On' : 'Expected'}</div>
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
