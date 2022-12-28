import { IcCFtick, IcCSendEmail } from '@cogoport/icons-react';
import React,{ useState, useEffect } from 'react';
import { Skeleton, ToolTip } from '@cogoport/front/components/admin';
import usei18n, { getFormattedPrice } from '@cogo/i18n';
import {
	Container,
	DullCircle,
	Line,
	LineContainer,
	SubContainer,
	EventContainer,
	DateContainer,
	AmountContainer,
	UserContainer,
} from './styles';

function formatAMPM(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours %= 12;
	hours = hours || 12;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	const strTime = `${hours}:${minutes} ${ampm}`;
	return strTime;
}

const POCTimeLine = ({ data, loading }) => {
	const { numLocale } = usei18n();
	const [complete, setComplete] = useState(false);

	const timeLine = data || [{}];

	const gettimeLineData = () => {
		if (timeLine[0]?.eventName === 'POSTED') {
			const removeLastItem = timeLine.slice(1, timeLine.length);
			return removeLastItem;
		}

		return timeLine;
	};

	useEffect(() => {
		setComplete(timeLine[0]?.eventName === 'POSTED');
	}, []);

	const dateWithTimeForIndex = timeLine[0]?.occurredAt?.split(' ') || '';

	const timeLineInitialStage = () => {
		if (loading) {
			return (
				<Skeleton
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
			<SubContainer>
				{timeLine[0]?.eventName === 'FULL' ||
				timeLine[0]?.eventName === 'OVERPAID' ? null : (
					<DateContainer>
						{dateWithTimeForIndex[0]}
						<div>{formatAMPM(new Date(timeLine[0]?.occurredAt))}</div>
					</DateContainer>
				)}
				<DullCircle />
				{timeLine[0]?.eventName === 'FULL' ||
				timeLine[0]?.eventName === 'OVERPAID' ? null : (
					<EventContainer>PAYMENT DUE</EventContainer>
				)}
			</SubContainer>
		);
	};

	return (
		<Container>
			{timeLine[0]?.eventName === 'POSTED' ? (
				<SubContainer>
					<DateContainer>
						{dateWithTimeForIndex[0]}
						<div>{formatAMPM(new Date(timeLine[0]?.occurredAt))}</div>
					</DateContainer>

					<IcCFtick width="35px" height="35px" />

					<EventContainer>POSTED</EventContainer>
				</SubContainer>
			) : (
				<SubContainer>{timeLineInitialStage()}</SubContainer>
			)}

			{(gettimeLineData() || []).map((item:any) => {
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
							<SubContainer>
								<Skeleton height="60px" width="6px" margin="10px 0px 0px" />
							</SubContainer>
						) : (
							<LineContainer>
								<Line className={complete ? 'complete' : 'pending'} />
							</LineContainer>
						)}

						{loading ? (
							<SubContainer>
								<Skeleton
									height="35px"
									width="35px"
									className="circle"
									margin="10px 0px 0px"
								/>
							</SubContainer>
						) : (
							<SubContainer>
								<DateContainer>
									{dateWithTime[0]}
									<div>{formatAMPM(new Date(occurredAt))}</div>
								</DateContainer>

								<div style={{ marginTop: '4px' }}>
									<IcCFtick width="30px" height="30px" />
								</div>

								<EventContainer>
									{eventName === 'FULL' ? (
										<span>PAID</span>
									) : (
										(eventName || '').replaceAll('_', ' ')
									)}
									<div style={{ display: 'flex', gap: '4px' }}>
										<UserContainer>{performedByUser}</UserContainer>
										{userEmail ? (
											<ToolTip
												theme="light-border"
												interactive
												content={
													<UserContainer>
														<a href={`mailto:${userEmail}`}>{userEmail}</a>
													</UserContainer>
												}
											>
												<div style={{ cursor: 'pointer' }}>
													<a href={`mailto:${userEmail}`}>
														<IcCSendEmail />
													</a>
												</div>
											</ToolTip>
										) : null}
									</div>

									{eventName === 'FULL' ||
									eventName === 'PAYMENT_INITIATED' ||
									eventName === 'PAYMENT_FAILED' ||
									eventName === 'PARTIAL' ? (
										<AmountContainer>
											Amount :-
											{getFormattedPrice(numLocale, payingAmount, 'INR')}
										</AmountContainer>
									) : null}
								</EventContainer>
							</SubContainer>
						)}
					</div>
				);
			})}
		</Container>
	);
};
export default POCTimeLine;
