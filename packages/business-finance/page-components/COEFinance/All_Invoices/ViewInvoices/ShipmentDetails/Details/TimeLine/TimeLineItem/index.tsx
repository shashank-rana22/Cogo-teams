import React from 'react';
import { Tooltip } from '@cogoport/components';
import {IcMFtick} from '@cogoport/icons-react';
import styles from './styles.module.css';

const TimeLineItem = ({
	item,
	isLast,
	shipmentData,
	timeLine,
	index,
	isCompleted,
	isNextMain,
}) => {
	const checkService = (shipmentData?.services || []).includes(
		item?.service_type,
	);
	const checkIsLast =
		index === timeLine?.length - 1 ? !timeLine[index - 1]?.completed_on : false;

	const isComplete = !!item?.completed_on && isCompleted;
	const className = !isComplete || checkIsLast ? 'pending' : 'complete';

	const minWidthAllow = isNextMain && !item.is_sub;

	const content = () => {
		return (
			<>
				<div className={styles.ToolTipText}>
					Milestone
					<div className="tooltipcontent">{item?.milestone}</div>
				</div>

				{item?.completed_on ? (
					<div className={styles.ToolTipText}>
						{isComplete ? 'Completed On' : 'Expected'}

						<div className="tooltipcontent">
							{item?.completed_on}
						</div>
					</div>
				) : null}
			</>
		);
	};

	return (
		<>
			{!item?.service_type && !checkService ? (
				<div className={`${isLast ? `last ${styles.Wrapper}` : styles.Wrapper}`}>
					<Tooltip
						placement="top"
						content={content()}
						theme="light"
					>
						<div className={styles.Flex}>
							{item?.is_sub && <div className={styles.FilledCircle}/>}
							{item?.completed_on && !item?.is_sub &&  <IcMFtick fill='red' width={20} height={20}/>}
							{!item?.completed_on && <div className={styles.BorderedCircle}/>}
						</div>
					</Tooltip>

					{!isLast ? (
						<div
							className={`${styles.Line} ${className} ${minWidthAllow ? 'min_width' : ''}`}
						/>
					) : null}

					{!item?.is_sub || isLast ? (
						<div className={`${styles.MileStoneDescription } ${isLast ? 'last' : ''}`}>
							<div className={`${styles.Desc} ${className}`}>{item.milestone}</div>

							{item?.completed_on ? (
								<div className={`${styles.Desc} ${className}`}>
									{item.completed_on}
								</div>
							) : null}
						</div>
					) : null}
				</div>
			) :null}
		</>
	);
};

export default TimeLineItem;
