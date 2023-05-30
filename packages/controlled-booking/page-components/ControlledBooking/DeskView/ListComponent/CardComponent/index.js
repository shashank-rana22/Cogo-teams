import { IcMArrowDown, IcMArrowUp, IcMTimer } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import React, { useRef, useEffect, useState } from 'react';

import MoreDetails from './MoreDetails';
import PortPair from './PortPair';
import StatusApproval from './StatusApproval';
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
	const { services, primary_service, approvals, importer_exporter, source } = item || {};
	const { agents } = importer_exporter;
	const ownerName = agents?.[0]?.name;

	const [showDetails, setShowDetails] = useState(false);

	const primaryServiceDetails = Object.values(services).filter(
		(childItem) => childItem.service_type === primary_service,
	);

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
						{startCase(source)}
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
								<div className={styles.business_name}>
									{startCase(item?.importer_exporter?.business_name) || '-'}
								</div>
								{' '}
								<div className={styles.tags}>
									{startCase(item?.importer_exporter?.sub_type)}
								</div>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div className={styles.primary_text}>
									User:
									<div className={styles.secondary_text}>
										{startCase(item?.importer_exporter_poc?.name) || '-'}

									</div>
								</div>

								<div className={styles.primary_text}>
									Requested By:
									<div className={styles.secondary_text}>
										{startCase(item?.quotation_email_sent_by
											?.name) || '--'}
									</div>
								</div>
							</div>
							<div className={styles.primary_text}>
								Kam:
								<div className={styles.secondary_text}>
									{ownerName}
								</div>
							</div>
						</div>

						<div className={styles.port_details}>
							<PortPair
								portPair={{
									originPort      : primaryServiceDetails?.[0]?.origin_port,
									destinationPort : primaryServiceDetails?.[0]?.destination_port,

								}}
								service_type={primary_service}
							/>

							<div
								style={{
									display        : 'flex',
									alignItems     : 'center',
									justifyContent : 'space-between',
									marginBottom   : 4,
									marginTop      : 6,
								}}
							>
								<div className={styles.primary_text}>
									ETD:
									<div className={styles.secondary_text}>
										{format(
											primaryServiceDetails?.[0]?.departure,
											'dd MMM YYYY',
										)}
									</div>
								</div>
								<div className={styles.primary_text}>
									--------
								</div>
								<div className={styles.primary_text}>
									Transit Time :
									<div className={styles.secondary_text}>
										4 Days
									</div>
								</div>
								<div className={styles.primary_text}>
									--------
								</div>
								<div className={styles.primary_text}>
									ETA  :
									<div className={styles.secondary_text}>
										{format(
											primaryServiceDetails?.[0]?.arrival,
											'dd MMM YYYY',
										)}
									</div>
								</div>
							</div>

							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
								<div className={styles.primary_text}>
									Shipping line :
									<div className={styles.secondary_text}>
										{primaryServiceDetails?.[0]?.shipping_line?.short_name}
									</div>
								</div>
								<div className={styles.primary_text}>
									Freight Value :
									<div className={styles.secondary_text}>
										{item?.total_price || '--'}
										{' '}
										{item?.total_price_currency}
									</div>
								</div>
								<div className={styles.primary_text}>
									Payment mode :
									<div className={styles.secondary_text}>
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
							<div className={styles.primary_text}>
								<div>
									{filters?.status === 'Approved on' ? 'Updated on' : 'Requested on'}
									:
								</div>
								<div className={styles.secondary_text}>
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

				{showDetails ? (
					<div className={styles.more_details}>
						<MoreDetails
							primaryServiceDetails={primaryServiceDetails}
							approvals={approvals}
							item={item}
							refetchBookingList={refetchBookingList}
							filters={filters}
						/>
					</div>
				) : null}

				{showDetails && filters.status === 'pending_approval'
					? (<StatusApproval filters={filters} item={item} refetchBookingList={refetchBookingList} />) : null}

				<div
					className={styles.take_actions}
					style={{
						backgroundColor: showDetails ? '#ffffff' : '#FDFBF6',
					}}
					role="presentation"
					onClick={() => setShowDetails(!showDetails)}
				>
					{showDetails ? 'Show less' : 'Take Action'}
					{' '}
					{showDetails ? <IcMArrowUp style={{ marginLeft: 4 }} />
						: <IcMArrowDown style={{ marginLeft: 4 }} />}
					{' '}
				</div>

			</div>

		</>
	);
}

export default CardComponent;
