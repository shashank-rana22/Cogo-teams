import { IcMTimer } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import React, { useRef, useEffect, useState } from 'react';

import PortPair from './PortPair';
import styles from './styles.module.css';

const handleTimer = (end_date) => {
	const timeNow = new Date().getTime();
	const countDownDate = new Date(end_date).getTime();

	const difference = Math.abs(countDownDate - timeNow);

	let days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours =		Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || '00';
	const minutes =		Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) || '00';
	const seconds = Math.floor((difference % (1000 * 60)) / 1000) || '00';

	if (days) {
		days = `${days} ${days > 1 ? 'Days' : 'Day'}`;
	} else days = '';

	return `${days}${' '}${hours}:${minutes}:${seconds} ${
		hours > 1 ? 'Hrs' : 'Hr'
	}`;
};

function CardComponent({ item = {}, filters = {}, refetchBookingList = () => {} }) {
	const { services, primary_service, importer_exporter, source } = item || {};
	const { agents } = importer_exporter;
	const ownerName = agents?.[0]?.name;

	const [showDetails, setShowDetails] = useState(false);

	const primaryServiceDetails = Object.values(services).filter(
		(childItem) => childItem.service_type === primary_service && childItem?.container_type === 'refer',
	)?.[0];

	console.log('primaryServiceDetails', primaryServiceDetails);

	const timerRef = useRef(null);
	let time = null;

	const hasExpired = new Date()?.getTime() >= new Date(item?.validity_end || '').getTime();

	useEffect(() => {
		if (!hasExpired) {
			const interval = setInterval(() => {
				time = handleTimer(item?.validity_end);

				if (time) {
					timerRef.current.innerText = time;
				}
			}, 1000);

			if (!item?.validity_end) {
				return () => clearInterval(interval);
			}
			return () => clearInterval(interval);
		}
		// return null;
	}, []);

	return (
		<>
			<div className={styles.parent}>
				<div className={styles.container}>
					<p className={styles.source}>
						{source}
					</p>
					<div className={styles.horizontal_div}>
						<div className={styles.quotation}>
							Quotation ID
							{' '}
							<div style={{ color: '#034AFD' }}>
								#
								{item?.serial_id}
							</div>
						</div>

						<div className={styles.account_div}>
							<div className={styles.account_name}>
								<div style={{
									maxWidth     : '80%',
									fontSize     : 16,
									whiteSpace   : 'nowrap',
									overflow     : 'hidden',
									textOverflow : 'ellipsis',
								}}
								>
									{startCase(item?.importer_exporter?.business_name) || '-'}
								</div>
								{' '}
								<div className={styles.tags}>
									{startCase(item?.importer_exporter?.sub_type)}
								</div>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div style={{ display: 'flex', color: '#828282', marginBottom: 4, marginTop: 4 }}>
									User:
									<div style={{
										color        : '#4F4F4F',
										marginLeft   : 4,
										maxWidth     : '80%',
										whiteSpace   : 'nowrap',
										overflow     : 'hidden',
										textOverflow : 'ellipsis',
									}}
									>
										{startCase(item?.importer_exporter_poc?.name) || '-'}

									</div>
								</div>
								<div style={{ display: 'flex', color: '#828282', marginBottom: 4, marginTop: 4 }}>
									Requested By:
									<div style={{ color: '#4F4F4F', marginLeft: 4 }}>
										{startCase(item?.quotation_email_sent_by
											?.name) || '--'}
									</div>
								</div>
							</div>
							<div style={{ display: 'flex', color: '#828282' }}>
								Kam:
								<div style={{ color: '#4F4F4F', marginLeft: 4 }}>
									{ownerName}
								</div>
							</div>
						</div>

						<div className={styles.port_details}>
							<PortPair
								portPair={{
									originPort      : primaryServiceDetails?.origin_port,
									destinationPort : primaryServiceDetails?.destination_port,

								}}
								service_type={primary_service}
							/>

							<div style={{
								display        : 'flex',
								alignItems     : 'center',
								justifyContent : 'space-between',
								marginBottom   : 4,
								marginTop      : 6,
							}}
							>
								<div style={{ display: 'flex', color: '#828282', fontSize: 12 }}>
									ETD:
									<div style={{ color: '#4F4F4F' }}>
										{format(
											primaryServiceDetails?.departure,
											'dd MMM YYYY',
										)}
									</div>
								</div>
								<div style={{ color: '#828282' }}>
									--------
								</div>
								<div style={{ display: 'flex', color: '#828282', fontSize: 12 }}>
									Transit Time :
									<div style={{ color: '#4F4F4F' }}>
										4 Days
									</div>
								</div>
								<div style={{ color: '#828282' }}>
									--------
								</div>
								<div style={{ display: 'flex', color: '#828282', fontSize: 12 }}>
									ETA  :
									<div style={{ color: '#4F4F4F' }}>
										{format(
											primaryServiceDetails?.arrival,
											'dd MMM YYYY',
										)}
									</div>
								</div>
							</div>

							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
								<div style={{
									display      : 'flex',
									color        : '#828282',
									fontSize     : 12,
									maxWidth     : '80%',
									whiteSpace   : 'nowrap',
									overflow     : 'hidden',
									textOverflow : 'ellipsis',
								}}
								>
									Shipping line :
									<div style={{ color: '#4F4F4F', marginLeft: 4 }}>
										{primaryServiceDetails?.shipping_line?.short_name}
									</div>
								</div>
								<div style={{
									display      : 'flex',
									color        : '#828282',
									fontSize     : 12,
									maxWidth     : '80%',
									whiteSpace   : 'nowrap',
									overflow     : 'hidden',
									textOverflow : 'ellipsis',
								}}
								>
									Freight Value :
									<div style={{ color: '#4F4F4F', marginLeft: 4 }}>
										{item?.total_price || '--'}
										{' '}
										{item?.total_price_currency}
									</div>
								</div>
								<div style={{
									display      : 'flex',
									color        : '#828282',
									fontSize     : 12,
									maxWidth     : '80%',
									whiteSpace   : 'nowrap',
									overflow     : 'hidden',
									textOverflow : 'ellipsis',
								}}
								>
									Payment mode :
									<div style={{ color: '#4F4F4F', marginLeft: 4 }}>
										Hard code
									</div>
								</div>
							</div>

						</div>

						<div className={styles.validity}>
							<p className={styles.timer}>
								<div style={{ marginLeft: 4 }}>
									{hasExpired
										? 'This Quotation has expired'
										: 'Validity expires in'}
								</div>

								{!hasExpired ? (
									<IcMTimer
										width={14}
										height={14}
										fill="#EE3425"
										style={{ margin: '4px 0px 0px 4px' }}
									/>
								) : null}
								<span
									id="timer"
									ref={timerRef}
									style={{ color: '#EE3425' }}
								/>

							</p>
							<div style={{ display: 'flex', color: '#828282', fontSize: 12 }}>
								<div>
									{filters?.status === 'Approved on' ? 'Updated on' : 'Requested on'}
									:
								</div>
								<div style={{ color: '#4F4F4F', marginLeft: 4 }}>
									{format(
										filters?.status === 'approved'
											? item?.created_at
											: item?.created_at,
										'dd MMM YYYY',
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.more_details}>

				<div
					style={{ display: 'flex', justifyContent: 'center', padding: 4, color: '#221F20', fontSize: 12 }}
					role="presentation"
					onClick={() => setShowDetails(!showDetails)}
				>
					Take Action
				</div>
				{showDetails ? (
					<div className={styles.more_details}>
						lol
					</div>
				) : null}

			</div>

		</>
	);
}

export default CardComponent;
