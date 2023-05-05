import { Modal, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import CargoDetails from '../../../../../commons/CargoDetails';
import ClickableDiv from '../../../../../commons/ClickableDiv';
import PortDetails from '../../../../../commons/PortDetails';
import ShipmentBreif from '../../../../../commons/ShipmentBreif';

import BlDetails from './BlDetails';
import CustodyShipments from './CustodyShipments';
import Invoices from './Invoices';
import Organizations from './Organizations';
import ReleaseCard from './ReleaseCard';
import styles from './styles.module.css';

function ShipmentAudit({
	item = {},
	closeModal = () => {},
	tabsState = {},
	role = 'kam',
	refetch = () => {},
	setShowModal = () => {},
}) {
	const moreInfoComponentMapping = {
		invoices  : <Invoices item={item} />,
		payments  : <Organizations item={item} />,
		shipments : <CustodyShipments item={item} />,
	};

	const { bucket = 'eligible', service } = tabsState;

	const { freight_service = {}, local_service = {} } = item;

	const primary_service = isEmpty(freight_service) ? local_service : freight_service;

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

	const headerTitle = () => (
		<div className={styles.modal_title}>
			<div className={styles.audits}>
				Audits &nbsp;
				{'>'}
&nbsp;
			</div>
			<div className={styles.bucket_title}>
				{startCase(bucket)}
			</div>
		</div>

	);

	return (
		<div className={styles.container}>
			<Modal
				size="fullscreen"
				show
				onClose={closeModal}
				className={styles.modal_container}
			>
				<Modal.Header
					title={headerTitle()}
				/>
				<Modal.Body className={styles.modal_body_content}>
					<div className={styles.shipment_content_container}>
						<div className={styles.shipment_details}>
							<ShipmentBreif item={item} service={service} redirectable />

							<PortDetails primary_service={primary_service} trade_type={item?.trade_type} />

							<CargoDetails primary_service={primary_service} />
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

				{role === 'credit_control' && isApprovalAllowed ? (
					<Modal.Footer className={styles.modal_footer_content}>
						<ReleaseCard data={item} bucket={bucket} refetch={refetch} setShowModal={setShowModal} />
					</Modal.Footer>
				) : null}
			</Modal>

			<div>Invoices</div>
		</div>
	);
}

export default ShipmentAudit;
