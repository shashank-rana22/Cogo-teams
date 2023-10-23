import { Tooltip, cl } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const LAST_INDEX = 1;

function TimeLineItem({
	item = {},
	isLast = false,
	shipmentData = {},
	timeLine = [],
	index = '',
	isCompleted = false,
	isNextMain = false,
}) {
	const checkService = (shipmentData?.services || []).includes(
		item?.service_type,
	);
	const checkIsLast = index === timeLine.length - LAST_INDEX ? !timeLine[index - LAST_INDEX]?.completed_on : false;

	const isComplete = !!item?.completed_on && isCompleted;
	const className = !isComplete || checkIsLast ? 'pending' : 'complete';

	const minWidthAllow = isNextMain && !item.is_sub;

	function Content() {
		return (
			<>
				<div className={styles.tool_tip_text}>
					Milestone
					<div className={styles.tool_tip_item}>{startCase(item?.milestone)}</div>
				</div>

				{item?.completed_on ? (
					<div className={styles.tool_tip_text}>
						{isComplete ? 'Completed On' : 'Expected'}

						<div className={styles.tool_tip_item}>
							{formatDate(item?.completed_on, 'dd-MMM-yy', {}, true)}
						</div>
					</div>
				) : null}
			</>
		);
	}

	return (

		!item?.service_type && !checkService ? (
			<div className={isLast ? styles.wrapper_last : styles.wrapper}>
				<Tooltip placement="top" content={Content()}>
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

				{!isLast
					&& minWidthAllow ? (
						<div
							className={cl`${styles.line} ${styles[className]} ${styles.min_width}`}
						/>
					) : (
						<div className={cl`${styles.line} ${styles[className]}`} />
					)}

				{!item?.is_sub || isLast ? (
					<div
						className={
                isLast ? `${styles.mile_stone_description} ${styles.last}` : `${styles.mile_stone_description}`
              }
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
