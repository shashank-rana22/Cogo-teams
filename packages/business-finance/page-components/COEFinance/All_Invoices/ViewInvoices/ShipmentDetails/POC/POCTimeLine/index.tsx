import { Placeholder, Tooltip } from '@cogoport/components';
import { IcCFtick, IcCSendEmail } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

interface DataInterface {
	eventName: string;
	occurredAt: string;
}
interface POCTimeLineInterface {
	loading: boolean;
	data: Array<DataInterface>;
}

function formatAMPM(date: any) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours %= 12;
	hours = hours || 12;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	const strTime = `${hours}:${minutes} ${ampm}`;
	return strTime;
}

function POCTimeLine({ data, loading }: POCTimeLineInterface) {
	const [complete, setComplete] = useState(false);

	const timeLine = data;

	const gettimeLineData = () => {
		if (timeLine[0]?.eventName === 'POSTED') {
			const removeLastItem = timeLine.slice(1, timeLine.length);
			return removeLastItem;
		}

		return timeLine;
	};

	useEffect(() => {
		setComplete(timeLine[0]?.eventName === 'POSTED');
	}, [timeLine]);

	const dateWithTimeForIndex = timeLine[0]?.occurredAt?.split(' ') || '';

	const timeLineInitialStage = () => {
		if (loading) {
			return (
				<Placeholder
					height="35px"
					width="35px"
					className="circle"
					margin="10px 0px 0px"
				/>
			);
		}

		if (data.length === 0) {
			return <div>TimeLine Does Not Exist</div>;
		}

		return (
			<div className={styles.subContainer}>
				{timeLine[0]?.eventName === 'FULL'
        || timeLine[0]?.eventName === 'OVERPAID' ? null : (
	<div className={styles.dateContainer}>
		{dateWithTimeForIndex[0]}
		<div>{formatAMPM(new Date(timeLine[0]?.occurredAt))}</div>
	</div>
					)}
				<div className={styles.dullCircle} />
				{timeLine[0]?.eventName === 'FULL'
        || timeLine[0]?.eventName === 'OVERPAID' ? null : (
	<div className={styles.eventContainer}>PAYMENT DUE</div>
					)}
			</div>
		);
	};

	return (
		<div className={styles.container}>
			{timeLine[0]?.eventName === 'POSTED' ? (
				<div className={styles.subContainer}>
					<div className={styles.dateContainer}>
						{dateWithTimeForIndex[0]}
						<div>{formatAMPM(new Date(timeLine[0]?.occurredAt))}</div>
					</div>

					<IcCFtick width="35px" height="35px" />

					<div className={styles.eventContainer}>POSTED</div>
				</div>
			) : (
				<div className={styles.subContainer}>{timeLineInitialStage()}</div>
			)}

			{(gettimeLineData() || []).map((item: any) => {
				const { id, eventName, occurredAt, performedByUser, userEmail } = item || {};

				const dateWithTime = occurredAt?.split(' ') || '';

				return (
					<div key={id}>
						{loading ? (
							<div className={styles.subContainer}>
								<Placeholder height="60px" width="6px" margin="10px 0px 0px" />
							</div>
						) : (
							<div className={styles.lineContainer}>
								<div
									className={
                    complete ? styles.lineComplete : styles.linePending
                  }
								/>
							</div>
						)}

						{loading ? (
							<div className={styles.subContainer}>
								<Placeholder
									height="35px"
									width="35px"
									className="circle"
									margin="10px 0px 0px"
								/>
							</div>
						) : (
							<div className={styles.subContainer}>
								<div className={styles.dateContainer}>
									{dateWithTime[0]}
									<div>{formatAMPM(new Date(occurredAt))}</div>
								</div>

								<div style={{ marginTop: '4px' }}>
									<IcCFtick width="30px" height="30px" />
								</div>

								<div className={styles.eventContainer}>
									{eventName === 'FULL' ? (
										<span>PAID</span>
									) : (
										(eventName || '').replaceAll('_', ' ')
									)}
									<div style={{ display: 'flex', gap: '4px' }}>
										<div className={styles.userContainer}>
											{performedByUser}
										</div>
										{userEmail ? (
											<Tooltip
												interactive
												content={(
													<div className={styles.userContainer}>
														<a href={`mailto:${userEmail}`}>{userEmail}</a>
													</div>
												)}
											>
												<div style={{ cursor: 'pointer' }}>
													<a href={`mailto:${userEmail}`}>
														<IcCSendEmail />
													</a>
												</div>
											</Tooltip>
										) : null}
									</div>

									{eventName === 'FULL'
                  || eventName === 'PAYMENT_INITIATED'
                  || eventName === 'PAYMENT_FAILED'
                  || eventName === 'PARTIAL' ? (
	<div className={styles.amountContainer}>
		Amount :-
		{/* {getFormattedPrice(numLocale, payingAmount, 'INR')} */}
	</div>
										) : null}
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
export default POCTimeLine;
