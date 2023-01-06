import React from 'react';
import { Tooltip } from '@cogoport/components';
import {formatDate} from '../../../../../../../commons/utils/formatDate';
import {IcMFtick} from '@cogoport/icons-react';
import styles from './styles.module.css';

interface ItemInt{
	service_type:string,
	completed_on?:any,
	is_sub:boolean,
	milestone:string,
}

interface ShipmentInt{
	services:string[],
}

interface ObjInt{
	completed_on:string,
}

interface TimeLineProps{
	item:ItemInt,
	isLast:boolean,
	shipmentData:ShipmentInt,
	timeLine:ObjInt[],
	index:number,
	isCompleted:any,
	isNextMain:any,
}

const TimeLineItem = ({
	item,
	isLast,
	shipmentData,
	timeLine,
	index,
	isCompleted,
	isNextMain,
}:TimeLineProps) => {
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
					Milestone:
					<div className={styles.tooltipItem}>{item?.milestone}</div>
				</div>

				{item?.completed_on ? (
					<div className={styles.ToolTipText}>
						{isComplete ? 'Completed On:' : 'Expected:'}

						<div className={styles.tooltipItem}>
							{formatDate(item?.completed_on)}
						</div>
					</div>
				) : null}
			</>
		);
	};

	return (
		<>
			{!item?.service_type && !checkService ? (
				<div className={isLast ?  styles.WrapperLast : styles.Wrapper}>
					<Tooltip
						placement="top"
						content={content()}
						theme="light"
					>
						<div className={styles.Flex}>
							{item?.completed_on && item?.is_sub && <div className={styles.FilledCircle}/>}
							{!item?.completed_on && item?.is_sub && <div className={styles.DotCircle}/>}
							{item?.completed_on && !item?.is_sub &&  <IcMFtick fill='red' width={20} height={20}/>}
							{!item?.completed_on && !item?.is_sub &&  <div className={styles.BorderedCircle}/>}
						</div>
					</Tooltip>

					{!isLast && item?.completed_on ? (
						<div
							className={`${styles.Line} ${className} ${minWidthAllow ? 'min_width' : ''}`}
						/>
					) : null}

                    {!isLast && !item?.completed_on ? (
						<div
							className={`${styles.LineGrey} ${className} ${minWidthAllow ? 'min_width' : ''}`}
						/>
					) : null}

					{!item?.is_sub || isLast ? (
						<div className={`${styles.MileStoneDescription } ${isLast ? 'last' : ''}`}>
							<div className={`${styles.Desc} ${className}`}>{item.milestone}</div>

							{item?.completed_on ? (
								<div className={`${styles.Desc} ${className}`}>
									{item?.completed_on}
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
