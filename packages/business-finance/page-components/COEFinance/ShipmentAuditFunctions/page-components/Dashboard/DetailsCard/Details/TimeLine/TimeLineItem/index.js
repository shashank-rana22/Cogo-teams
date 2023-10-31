/* eslint-disable no-nested-ternary */
import { Tooltip, cl } from '@cogoport/components';
import { IcMFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { formatDate } from '../../../../../../../../commons/utils/formatDate';
import { getDepartureArrivalDate } from '../../../../../../../utils/getDepartureArrivalDate';
import isMileStoneCompleted from '../../../../../../../utils/isMileStoneCompleted';

import Content from './Content';
import styles from './styles.module.css';

const LAST_INDEX = 1;

function TimeLineItem({
	item = {},
	isLast = false,
	shipmentData = {},
	timeLine = [],
	index = '',
	isCompleted = false,
}) {
	const checkService = (shipmentData?.services || []).includes(
		item?.service_type,
	);
	const checkIsLast = index === timeLine.length - LAST_INDEX ? !timeLine[index - LAST_INDEX]?.completed_on : false;

	let displayCompletedDate = item?.completed_on;

	if (item?.milestone === 'Vessel Departed From Origin (ETD)' && !displayCompletedDate) {
		displayCompletedDate = getDepartureArrivalDate({ shipmentData, key: 'departure' });
	} else if (item?.milestone === 'Vessel Arrived At Destination (ETA)' && !displayCompletedDate) {
		displayCompletedDate = getDepartureArrivalDate({ shipmentData, key: 'arrival' });
	}

	const isComplete = isMileStoneCompleted({
		timelineItem: {
			milestone    : item?.milestone,
			completed_on : displayCompletedDate,
		},
		consecutivelyCompleted: isCompleted,
	})?.isCompleted && isCompleted;

	const className = !isComplete || checkIsLast ? 'pending' : 'complete';

	return (

		!item?.service_type && !checkService ? (
			<div className={isLast ? styles.wrapper_last : styles.wrapper}>
				<Tooltip
					placement="top"
					content={(
						<Content
							item={item}
							displayCompletedDate={displayCompletedDate}
							isComplete={isComplete}
						/>
					)}
				>
					<div className={styles.flex}>
						{(() => {
							if ((!item?.is_sub || isLast) && className === 'complete'
							&& item?.completed_on && !item?.is_sub) {
								return <IcMFtick color="red" height={20} width={20} />;
							} if (!item?.is_sub || isLast) {
								return <div className={cl`${styles.bordered_circle} ${styles[className]}`} />;
							}
							return <div className={cl`${styles.filled_circle} ${styles[className]}`} />;
						})()}
					</div>
				</Tooltip>

				{!isLast ? (
					<div
						className={cl`${styles.line} ${styles[className]}`}
					/>
				) : null}

				{!item?.is_sub || isLast ? (
					<div
						className={isLast
							? `${styles.mile_stone_description} ${styles.last}`
							: `${styles.mile_stone_description}`}
					>
						<div
							className={
                  className === 'pending' ? `${styles.desc} ${styles[className]}` : styles.desc
                }
						>
							{startCase(item.milestone)}
						</div>

						{item?.completed_on ? (
							<div
								className={
                    className === 'pending' ? `${styles.desc} ${styles[className]}` : styles.desc
                  }
							>
								{formatDate(item.completed_on, 'dd-MMM-yy', {}, true)}
							</div>
						) : null}
					</div>
				) : null}
			</div>
		) : null

	);
}

export default TimeLineItem;
