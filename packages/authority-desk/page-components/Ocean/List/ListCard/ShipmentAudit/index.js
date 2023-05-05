import { Modal, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CargoDetails from '../../../../../commons/CargoDetails';
import ClickableDiv from '../../../../../commons/ClickableDiv';
import PortDetails from '../../../../../commons/PortDetails';
import ShipmentBreif from '../../../../../commons/ShipmentBreif';

import BlDetails from './BlDetails';
import Invoices from './Invoices';
import Organizations from './Organizations';
import ReleaseCard from './ReleaseCard';
import styles from './styles.module.css';

const moreInfoComponentMapping = {
	invoices  : <Invoices />,
	payments  : <Organizations />,
	shipments : <ReleaseCard />,
};

function ShipmentAudit({
	item = {},
	closeModal = () => {},
	tabsState = {},
	role = 'kam',
}) {
	const { bucket = 'eligible', service } = tabsState;

	const { freight_service } = item;

	const tabs = {
		invoices : 'Invoices',
		payments : `Payments - Total Outstanding ${formatAmount({
			amount   : item?.invoice_status?.outstanding_amount,
			currency : item?.invoice_status?.outstanding_currency,
			options  : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 2,
			},
		})}`,
		shipments: 'Shipments In Custody',
	};

	const isApprovalAllowed = [
		'eligible',
		'requested',
		'hold',
		'approved',
		'released',
	].includes(bucket);

	const [additionalTab, setAdditionalTab] = useState('invoices');

	return (
		<div className={styles.container}>
			<Modal
				size="fullscreen"
				show
				onClose={closeModal}
				className={styles.modal_container}
			>
				<Modal.Header
					title={`Shipments > Audits > ${startCase(bucket)}`}
				/>
				<Modal.Body className={styles.modal_body_content}>
					<div className={styles.shipment_content_container}>
						<div className={styles.shipment_details}>
							<ShipmentBreif item={item} service={service} redirectable />

							<PortDetails primary_service={freight_service} />

							<CargoDetails primary_service={freight_service} />
						</div>

						<div className={styles.bl_details}>
							<BlDetails item={item} />
						</div>
					</div>

					<div className={styles.tabs}>
						{Object.keys(tabs).map((tab) => (
							<ClickableDiv
								className={cl`${styles.tab} ${
									tab === additionalTab
										? styles.active
										: ''
								}`}
								onClick={() => setAdditionalTab(tab)}
							>
								{tabs[tab]}
							</ClickableDiv>
						))}
					</div>

					<div className={styles.more_info}>
						{moreInfoComponentMapping[additionalTab]}
					</div>
				</Modal.Body>

				<Modal.Footer className={styles.modal_footer_content}>
					{role === 'credit_control' && isApprovalAllowed ? (
						<ReleaseCard data={item} bucket={bucket} />
					) : null}
				</Modal.Footer>
			</Modal>

			<div>Invoices</div>
		</div>
	);
}

export default ShipmentAudit;
