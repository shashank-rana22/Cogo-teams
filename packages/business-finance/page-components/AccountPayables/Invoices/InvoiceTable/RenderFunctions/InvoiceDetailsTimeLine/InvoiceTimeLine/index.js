import { Placeholder, Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFtick, IcCSendEmail } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const geo = getGeoConstants();

function InvoiceTimeLine({ data, loading }) {
	const [complete, setComplete] = useState(false);

	const timeLine = data || [{}];

	const gettimeLineData = () => {
		if (timeLine[0]?.eventName === 'POSTED') {
			return timeLine?.slice(1, timeLine.length);
		}

		return timeLine;
	};

	useEffect(() => {
		setComplete(timeLine[0]?.eventName === 'POSTED');
	}, []);

	const dateWithTimeForPaymentDueDate =		timeLine[0]?.paymentDueDate?.split(' ') || '';

	const dateWithTimeForPosted = timeLine[0]?.occurredAt?.split(' ') || '';

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

		if (data?.length === 0) {
			return <div>TimeLine Does Not Exist</div>;
		}

		return (
			<div className={styles.subcontainer}>
				{['FULL', 'OVERPAID'].includes(timeLine[0]?.eventName) ? null : (
					<div className={styles.datecontainer}>
						{dateWithTimeForPaymentDueDate[0]}
						<div>
							{
							formatDate({
								date       : (new Date(timeLine[0]?.paymentDueDate)),
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : '/',
							})
}
						</div>
					</div>
				)}
				<div className={styles.dullcircle} />
				{['FULL', 'OVERPAID'].includes(timeLine[0]?.eventName) ? null : (
					<div className={styles.eventcontainer}>PAYMENT DUE</div>
				)}
			</div>
		);
	};

	return (
		<div className={styles.container}>
			{timeLine[0]?.eventName === 'POSTED' ? (
				<div className={styles.subcontainer}>
					<div className={styles.datecontainer}>
						{dateWithTimeForPosted[0]}
						<div>
							{formatDate({
								date       : new Date(timeLine[0]?.occurredAt),
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : '/',
							})}
						</div>
					</div>

					<IcCFtick width="35px" height="35px" />

					<div className={styles.eventcontainer}>POSTED</div>
				</div>
			) : (
				<div className={styles.subcontainer}>{timeLineInitialStage()}</div>
			)}

			{(gettimeLineData() || [])?.map((item) => {
				const {
					id,
					eventName,
					payingAmount,
					occurredAt,
					performedByUser,
					userEmail,
				} = item || {};

				const dateWithTime = occurredAt?.split(' ') || '';

				return (
					<div key={id}>
						{loading ? (
							<div className={styles.subcontainer}>
								<Placeholder height="60px" width="6px" margin="10px 0px 0px" />
							</div>
						) : (
							<div className={styles.linecontainer}>
								<div className={`${styles.line} ${complete ? styles.complete : styles.pending}`} />
							</div>
						)}

						{loading ? (
							<div className={styles.subcontainer}>
								<Placeholder
									height="35px"
									width="35px"
									className="circle"
									margin="10px 0px 0px"
								/>
							</div>
						) : (
							<div className={styles.subcontainer}>
								<div className={styles.datecontainer}>
									{dateWithTime[0]}
									<div>
										{formatDate({
											date       : occurredAt,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
											formatType : 'dateTime',
											separator  : '/',
										})}
									</div>
								</div>

								<div style={{ marginTop: '4px' }}>
									<IcCFtick width="30px" height="30px" />
								</div>

								<div className={styles.eventcontainer}>
									{eventName === 'FULL' ? (
										<span>PAID</span>
									) : (
										(eventName || '')?.replaceAll('_', ' ')
									)}
									<div style={{ display: 'flex', gap: '4px' }}>
										<div className={styles.usercontainer}>{performedByUser}</div>
										{userEmail ? (
											<Tooltip
												theme="light"
												interactive
												content={(
													<div className={styles.usercontainer}>
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

									{['FULL', 'PAYMENT_INITIATED', 'PAYMENT_FAILED', 'PARTIAL'].includes(eventName) ? (
										<div className={styles.amountcontainer}>
											Amount :-
											{formatAmount({
												amount   : payingAmount,
												currency : geo.country.currency.code,
												options  : {
													style                 : 'currency',
													currencyDisplay       : 'code',
													maximumFractionDigits : 0,
													notation              : 'compact',
												},
											})}
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
export default InvoiceTimeLine;
