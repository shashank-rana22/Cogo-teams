/* eslint-disable no-nested-ternary */
import { Tooltip } from '@cogoport/components';
import { IcMFtick } from '@cogoport/icons-react';
import startCase from '@cogoport/utils/src/utilities/startCase';
import React from 'react';

import { formatDate } from '../../../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

interface ItemInt {
	service_type: string;
	completed_on?: any;
	is_sub: boolean;
	milestone: string;
}

interface ShipmentInt {
	services?: string[];
}

interface ObjInt {
	completed_on: string;
}

interface TimeLineProps {
	item: ItemInt;
	isLast: boolean;
	shipmentData: ShipmentInt;
	timeLine: ObjInt[];
	index: number;
	isCompleted: any;
	isNextMain: any;
}

function TimeLineItem({
	item,
	isLast,
	shipmentData,
	timeLine,
	index,
	isCompleted,
	isNextMain,
}: TimeLineProps) {
	const checkService = (shipmentData?.services || []).includes(
		item?.service_type,
	);
	const checkIsLast = index === timeLine.length - 1 ? !timeLine[index - 1]?.completed_on : false;

	const isComplete = !!item?.completed_on && isCompleted;
	const className = !isComplete || checkIsLast ? 'pending' : 'complete';

	const minWidthAllow = isNextMain && !item.is_sub;

	const content = () => (
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

	return (

		!item?.service_type && !checkService ? (
			<div className={isLast ? styles.wrapper_last : styles.wrapper}>
				<Tooltip placement="top" content={content()}>
					<div className={styles.flex}>
						{!item?.is_sub || isLast ? (

							className === 'complete'
                  && item?.completed_on
                  && !item?.is_sub ? (
	<IcMFtick color="red" height={20} width={20} />
								) : (
									<div
										className={`${styles.bordered_circle} ${styles[className]}`}
									/>
								)

						) : (
							<div
								className={`${styles.filled_circle} ${styles[className]}`}
							/>
						)}
					</div>
				</Tooltip>

				{!isLast ? (
					minWidthAllow ? (
						<div
							className={`${styles.line} ${styles[className]} ${styles.min_width}`}
						/>
					) : (
						<div className={`${styles.line} ${styles[className]}`} />
					)
				) : null}

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
