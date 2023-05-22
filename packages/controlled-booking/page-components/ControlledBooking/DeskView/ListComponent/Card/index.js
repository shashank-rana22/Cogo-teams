import { Button } from '@cogoport/components';
import { IcMTimer } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import React, { useEffect, useRef } from 'react';

import ContainerDetails from './ContainerDetails';
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

const handleDownload = (val) => {
	if (val) {
		window.open(val, '_blank');
	}
};

function Card({ item, filters, refetchBookingList }) {
	const { services, primary_service, approvals, importer_exporter, source } = item || {};

	const { agents } = importer_exporter;

	const ownerName = agents?.[0]?.name;

	const primaryServiceDetails = Object.values(services).filter(
		(childItem) => childItem.service_type === primary_service && childItem?.container_type === 'refer',
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
		<div className={styles.card}>

			<div className={styles.header}>
				<div style={{ display: 'flex' }}>

					<div className={styles.source}>
						{startCase(source)}
					</div>

				</div>

				<div className={styles.details}>

					<div style={{ display: 'flex', fontSize: 12 }}>
						Account Owner :

						<div className={styles.requester_name}>
							{startCase(ownerName) || '-'}

						</div>
					</div>

					<div className={styles.requested_details}>
						Requested By
						{' '}
						{/* {startCase(item?.user?.name)} */}
						:
						<div className={styles.requester_name}>
							{startCase(item?.quotation_email_sent_by
								?.name) || '--'}

						</div>
					</div>

					<div className={styles.pair}>
						<div>
							{filters?.status === 'approved' ? 'Updated Date' : 'Requested Date '}
							:
						</div>
						<div className={styles.value}>
							{format(
								filters?.status === 'approved'
									? item?.created_at
									: item?.created_at,
								'dd MMM YYYY',
							)}
						</div>
					</div>
					{filters.status === 'pending_approval' ? (
						<>
							{' '}
							<div className={styles.pair}>
								{/* <div>Validity End:</div> */}

								<div className={styles.value}>
									{/* {format(
								item?.validity_end,
								'dd MMM YYYY',
							)} */}
									<p className={styles.timer}>
										<span style={{ fontWeight: 400, marginLeft: '4px' }}>
											{hasExpired
												? 'This Quotation has expired'
												: 'validity expires in'}
										</span>

										{!hasExpired ? (
											<IcMTimer
												width={14}
												height={14}
												style={{ margin: '4px 0px 0px 4px' }}
											/>
										) : null}
										<span
											id="timer"
											ref={timerRef}
										/>

									</p>

								</div>
							</div>
						</>
					) : null}

				</div>
			</div>

			<div className={styles.proof_sheet}>
				<div style={{ display: 'flex ' }}>
					<div className={styles.heading}>

						Quotation ID #
						{' '}
						{item?.serial_id}

						<div className={styles.content}>
							<div className={styles.name}>
								{/* {startCase(item?.contract_name)} */}
							</div>
						</div>
					</div>

					<div className={styles.business_name}>
						Shipper Name:
						<div className={styles.org_name}>
							{startCase(item?.importer_exporter?.business_name) || '-'}
							{' '}

						</div>
						(
						{startCase(item?.importer_exporter?.sub_type)}
						)
					</div>
				</div>

				<div className={styles.proofs}>

					<Button
						size="md"
						themeType="link"
						onClick={() => handleDownload(approvals?.[0]?.manager_approval_proof)}
					>
						Manager approval Proof
					</Button>

				</div>
			</div>

			<div className={styles.port}>
				<PortPair
					portPair={{
						originPort      : primaryServiceDetails?.[0]?.origin_port,
						destinationPort : primaryServiceDetails?.[0]?.destination_port,

					}}
					service_type={primary_service}
				/>
				<div className={styles.detailsData}>
					{primaryServiceDetails?.map((childItem) => (
						<ContainerDetails key={childItem.id} details={childItem} />
					))}
				</div>
			</div>

			{/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}

			{filters.status === 'pending_approval'
				? (<StatusApproval filters={filters} item={item} refetchBookingList={refetchBookingList} />) : null}

			{/* </div> */}

		</div>
	);
}

export default Card;
