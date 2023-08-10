import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDown, IcMArrowUp, IcMTimer } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
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
const getTransitTime = ({ departure, arrival }) => {
	const dateString1 = departure;
	const dateString2 = arrival;

	const dateParts1 = dateString1.split('/');
	const date1 = new Date(dateParts1[2], dateParts1[1] - 1, dateParts1[0]);

	const dateParts2 = dateString2.split('/');
	const date2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);

	const timeDiff = Math.abs(date2.getTime() - date1.getTime());

	const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

	return daysDiff;
};

function CardComponent({ item = {}, filters = {}, refetchBookingList = () => {} }) {
	const {
		services,
		primary_service,
		importer_exporter,
		source, checkout_detail = {},
	} = item || {};

	const { agents } = importer_exporter;
	const ownerName = agents?.[0]?.name;
	const { rate, detail } = checkout_detail || {};
	const { checkout_approvals } = detail || {};
	const { additional_info = {} } = checkout_approvals[0] || {};

	const {
		tax_total_price_discounted,
		tax_total_price_currency,
	} = rate;

	const [showDetails, setShowDetails] = useState(false);

	const primaryServiceDetails = Object.values(services).filter(
		(childItem) => childItem.service_type === primary_service,
	);

	const timerRef = useRef(null);
	const intervalRef = useRef(null);

	const hasExpired = new Date()?.getTime() >= new Date(item?.validity_end || '').getTime();

	useEffect(() => {
		if (hasExpired && intervalRef.current) {
			clearInterval(intervalRef.current);
		} else {
			intervalRef.current = setInterval(() => {
				timerRef.current.innerText = handleTimer(item?.validity_end);
			}, 1000);

			if (!item?.validity_end) {
				clearInterval(intervalRef.current);
			}
		}

		return () => intervalRef.current && clearInterval(intervalRef.current);
	}, [hasExpired, item?.validity_end]);

	const departure = formatDate({
		date       : primaryServiceDetails?.[0]?.departure,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
	});

	const arrival = formatDate({
		date       : primaryServiceDetails?.[0]?.arrival,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
	});

	return (
		<>
			<div className={styles.parent}>
				<div className={styles.container}>
					<p className={styles.source}>
						{startCase(source)}
					</p>
					<div className={styles.horizontal_div}>
						<div className={styles.quotation}>
							{filters.status === 'approved' ? 'Shipment ID' : 'Quotation ID'}
							<div style={{ color: '#034AFD' }}>
								#
								{filters.status === 'approved' ? additional_info?.shipment_serial_id
									: item?.serial_id}
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
										{startCase(checkout_approvals?.[0]?.requested_by_user
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
								className={styles.text_style}
							>
								<div className={styles.primary_text}>
									ETD:
									<div className={styles.secondary_text}>
										{formatDate({
											date       : primaryServiceDetails?.[0]?.departure,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
										})}
									</div>
								</div>
								<div className={styles.primary_text}>
									--------
								</div>
								<div className={styles.primary_text}>
									Transit Time :
									<div className={styles.secondary_text}>
										{getTransitTime({ arrival, departure })}
										{' '}
										Days
									</div>
								</div>
								<div className={styles.primary_text}>
									--------
								</div>
								<div className={styles.primary_text}>
									ETA  :
									<div className={styles.secondary_text}>
										{formatDate({
											date       : primaryServiceDetails?.[0]?.arrival,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
										})}
									</div>
								</div>
							</div>

							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div className={styles.primary_text}>
									Shipping line :
									<div className={styles.secondary_text}>
										{primaryServiceDetails?.[0]?.shipping_line?.short_name}
									</div>
								</div>
								<div className={styles.primary_text}>
									Freight Value :
									<div className={styles.secondary_text}>
										{tax_total_price_discounted?.toFixed(2) || '--'}
										{' '}
										{tax_total_price_currency}
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
									{formatDate({
										date: filters?.status !== 'approved'
											? item?.created_at
											: item?.updated_at,
										dateFormat: GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
									})}
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
							approvals={checkout_approvals}
							tax_total_price_discounted={tax_total_price_discounted}
							tax_total_price_currency={tax_total_price_currency}
						/>
					</div>
				) : null}

				{showDetails && filters.status === 'pending_approval'
					? (<StatusApproval filters={filters} item={item} refetchBookingList={refetchBookingList} />) : null}

				<div
					role="presentation"
					className={styles.take_actions}
					style={{
						backgroundColor: showDetails ? '#ffffff' : '#FDFBF6',
					}}
					onClick={() => setShowDetails((pv) => !pv)}
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
