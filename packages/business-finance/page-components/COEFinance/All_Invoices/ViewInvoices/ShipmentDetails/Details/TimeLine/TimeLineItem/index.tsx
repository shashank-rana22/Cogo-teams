import React from 'react';
import {formatDate} from '../../../../../../../commons/utils/formatDate';
import startCase from "@cogoport/utils/src/utilities/startCase";
import { Tooltip } from '@cogoport/components';
import {IcMFtick} from '@cogoport/icons-react';
import styles from './styles.module.css';

interface ItemInt{
	service_type:string,
	completed_on?:any,
	is_sub:boolean,
	milestone:string,
}

interface ShipmentInt{
	services?:string[],
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
					Milestone
					<div className={styles.tooltipItem}>{startCase(item?.milestone)}</div>
				</div>

				{item?.completed_on ? (
				<div className={styles.ToolTipText}>
						{isComplete ? 'Completed On' : 'Expected'}

						<div className={styles.tooltipItem}>
							{formatDate(item?.completed_on,"dd-MMM-yy",{},true)}
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
						animation="perspective"
					>
						<div className={styles.Flex}>
							{!item?.is_sub || isLast ? (
								<>
								{className==='complete' &&  item?.completed_on && !item?.is_sub ? (
									<IcMFtick color="red" height={20} width={20}/>
								):(
									<div className={`${styles.BorderedCircle} ${styles[className]}`} />
								)}
								</>
							) : (
								<div className={`${styles.FilledCircle} ${styles[className]}`} />
							)}
						</div>
					</Tooltip>

                    {!isLast ? (
                           <>
                           {minWidthAllow ? <div className={`${styles.Line} ${styles[className]} ${styles.min_width}`} />
                              :<div className={`${styles.Line} ${styles[className]}`}/>
                           }
                           </>
                    ):null}

					{!item?.is_sub || isLast ? (
                        <div className={isLast ? `${styles.MileStoneDescription} ${styles.last}` :`${ styles.MileStoneDescription}`}>
                            <div className={className === 'pending' ? `${styles.Desc} ${styles[className]}` : styles.Desc}>{startCase(item.milestone)}</div>

							{item?.completed_on ? (
								 <div className={className === 'pending' ? `${styles.Desc} ${styles[className]}` : styles.Desc}>
									{formatDate(item.completed_on,"dd-MMM-yy",{},true)}
								</div>
							) : null}
                            </div>
					) : null }
				</div>
			) : null}
		</>
	);
};

export default TimeLineItem;
