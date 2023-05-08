import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React, { useState } from 'react';

import RequestModal from '../RequestModal';
import ShipmentAudit from '../ShipmentAudit';

import styles from './styles.module.css';

function Footer({ item = {}, role = '', tabsState = {}, refetch = () => {} }) {
	const [showModal, setShowModal] = useState(false);

	const closeModal = () => setShowModal(false);

	const renderButtonCondition = () => {
		if (
			role === 'kam'
			&& ['ineligible', 'hold'].includes(tabsState.bucket)
			&& item?.invoice_status?.is_invoice_validated
		) {
			return (
				<Button onClick={() => setShowModal('request_modal')}>
					Request
				</Button>
			);
		}

		if (role === 'credit_control') {
			return (
				<Button onClick={() => setShowModal('shipment_audit')}>
					Audit
				</Button>
			);
		}
		return null;
	};

	return (
		<>
			<div className={styles.footer}>
				<div className={styles.organization_details}>
					<div className={styles.business_name}>
						Customer Name: &nbsp;
						{item?.importer_exporter?.business_name}
								&nbsp;
					</div>
					<div>
						Outstanding: &nbsp;
						{formatAmount({
							amount: item?.invoice_status
								?.outstanding_amount,
							currency : item?.currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
					<div>
						On-going shipments: &nbsp;
						{item?.ongoing_shipments}
					</div>
				</div>

				<div>
					{renderButtonCondition()}
				</div>
			</div>

			{showModal === 'shipment_audit' ? (
				<ShipmentAudit
					closeModal={closeModal}
					item={item}
					tabsState={tabsState}
					role={role}
					refetch={refetch}
					setShowModal={setShowModal}

				/>
			) : null}

			{showModal === 'request_modal' ? (
				<RequestModal
					closeModal={closeModal}
					data={item}
					refetch={refetch}
					tabsState={tabsState}
				/>
			) : null}

		</>

	);
}

export default Footer;
