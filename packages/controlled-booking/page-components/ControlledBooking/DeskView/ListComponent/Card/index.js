import { Popover, Button } from '@cogoport/components';
import { startCase, format } from '@cogoport/utils';
import React from 'react';

import ContainerDetails from './ContainerDetails';
import PortPair from './PortPair';
import StatusApproval from './StatusApproval';
import styles from './styles.module.css';

const handleDownload = (val) => {
	if (val) {
		window.open(val, '_blank');
	}
};

function Card({ item, filters, refetchBookingList }) {
	const { services, primary_service, approvals } = item || {};

	console.log('services', services);

	const primaryServiceDetails = Object.values(services).filter(
		(childItem) => childItem.service_type === primary_service && childItem?.container_type === 'refer',
	);

	return (
		<div className={styles.card}>

			<div className={styles.header}>
				<div className={styles.heading}>

					Serial ID #
					{' '}
					{item?.serial_id}

					<div className={styles.content}>
						<div className={styles.name}>
							{/* {startCase(item?.contract_name)} */}
						</div>
					</div>
				</div>

				<div className={styles.details}>
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
					<div className={styles.pair}>
						<div>Validity End:</div>
						<div className={styles.value}>
							{format(
								item?.validity_end,
								'dd MMM YYYY',
							)}

						</div>
					</div>

				</div>
			</div>

			<div className={styles.proof_sheet}>
				<div className={styles.business_name}>
					Shipper Name:
					<div className={styles.org_name}>{startCase(item?.importer_exporter?.business_name) || '-'}</div>
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

			{filters.status === 'pending_approval'
				? (<StatusApproval filters={filters} item={item} refetchBookingList={refetchBookingList} />) : null}

		</div>
	);
}

export default Card;
