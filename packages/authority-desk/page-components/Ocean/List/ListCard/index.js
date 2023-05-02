import { Tooltip, Button } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CargoDetails from '../../../../commons/CargoDetails';
import PortDetails from '../../../../commons/PortDetails';
import ShipmentBreif from '../../../../commons/ShipmentBreif';

import AdditionalShipmentInfo from './AdditionalShipmentInfo';
import ShipmentAudit from './ShipmentAudit';
import styles from './styles.module.css';

function ListCard({ item }) {
	const [showDetails, setShowDetails] = useState(false);

	const [showAudit, setShowAudit] = useState(false);

	const { freight_service } = item;

	const {
		free_days_demurrage_destination,
		free_days_demurrage_origin,
		free_days_detention_destination,
		free_days_detention_origin,
	} = freight_service;

	const documents = () => (
		(item?.bill_of_ladings || []).map((doc) => (
			<div>{doc?.bl_number}</div>
		))
	);

	return (
		<>

			<div className={styles.container}>
				<div className={styles.status}>
					&nbsp;
					Status :
					&nbsp;
					{startCase(freight_service?.state)}
				</div>
				<div className={styles.detail_container}>
					<div className={styles.shipment_details}>
						<ShipmentBreif item={item} />
						<PortDetails primary_service={freight_service} />
						<CargoDetails primary_service={freight_service} />
					</div>
					<div className={styles.shipment_extra_details}>
						<div className={styles.detention_demurrage}>

							<span>
								&nbsp;
								Origin :
								&nbsp;
								{ free_days_detention_origin}
								&nbsp;
								days ,
								&nbsp;
								{free_days_demurrage_origin}
								&nbsp;
								days
							</span>
							<br />
							<span>
								&nbsp;
								Destination :
								&nbsp;
								{free_days_detention_destination}
								&nbsp;
								days,
								&nbsp;
								{free_days_demurrage_destination}
								&nbsp;
								days
								&nbsp;
							</span>
						</div>

						<div className={styles.documents_and_invoices}>
							<Tooltip
								theme="light"
								content={documents()}
								placement="bottom"
								animation="shift-away"
								interactive
							>
								<div className={styles.documents}> View Documents</div>
							</Tooltip>
							<div className={styles.validation}>
								Sales Invoice Status:
								{'  '}
								<span className={styles.text}>
									{ item?.invoice_status ? 'System Validated ' : 'Validation Pending' }
								&nbsp;
								</span>
							</div>
						</div>

						<div className={styles.bl_details}>

							<div>
								BL Type :
								&nbsp;
								{item?.freight_service?.bl_category}
							</div>
							<div>
								Expected Release Date :
								&nbsp;
								{ format(item?.bill_of_ladings?.expected_release_date, 'dd MMM yyyy')}
							</div>
						</div>

					</div>

					<div className={styles.footer}>
						<div className={styles.organization_details}>
							<div className={styles.business_name}>
								{item?.importer_exporter?.business_name}
							&nbsp;
							</div>
							<div>
								Outstanding :
								&nbsp;
								{item?.invoice_status?.outstanding_amount}
							</div>
							<div>
								On-going shipments :
								&nbsp;
								&nbsp;

							</div>
						</div>

						<Button onClick={() => setShowAudit(!showAudit)}> Audit</Button>

					</div>

				</div>

				{ showDetails ? (
					<div className={styles.additional_audits}>
						{' '}
						<AdditionalShipmentInfo item={item} />
						{' '}
					</div>
				) : null }

				<div className={styles.less_more_details}>
					<span
						className={styles.additional_text}
						role="presentation"
						onClick={() => setShowDetails(!showDetails)}
					>
					&nbsp;
						{ showDetails ? 'View Less' : 'View More' }
					&nbsp;
					</span>
				</div>
			</div>
			{showAudit ? (
				<ShipmentAudit
					showAudit={showAudit}
					setShowAudit={setShowAudit}
					item={item}
				/>
			) : null}

		</>

	);
}

export default ListCard;
