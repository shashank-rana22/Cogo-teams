import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import styles from '../styles.module.css';

import Actions from './Actions';

const RESTRICT_REVOKED_STATUS = ['revoked', 'finance_rejected'];

const API_SUCCESS_MESSAGE = {
	reviewed : 'Invoice sent for approval to customer!',
	approved : 'Invoice approved!,',
};

const BF_INVOICE_STATUS = ['POSTED', 'FAILED', 'IRN_GENERATED'];
const ALLOWED_ENTITY_ID_FOR_CN = ['04bd1037-c110-4aad-8ecc-fc43e9d4069d'];

function Status({
	invoice = {},
	invoiceData = {},
	invoicesList = [],
	refetchAferApiCall = () => {},
	updateInvoiceStatus = () => {},
	isIRNGenerated = false,
	setAskNullify = () => {},
}) {
	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));
	const isAuthorized = user_data?.user?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;
	const { shipment_data } = useContext(ShipmentDetailContext);

	const bfInvoice = invoicesList?.filter(
		(item) => item?.proformaNumber === invoice?.live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index];

	const showCN = BF_INVOICE_STATUS.includes(
		bfInvoice?.status,
	);

	let invoiceStatus = invoicesList?.filter(
		(item) => item?.invoiceNumber === invoice?.live_invoice_number
			|| item?.proformaNumber === invoice?.live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index]?.status;

	if (invoiceStatus === 'POSTED') {
		invoiceStatus = 'IRN GENERATED';
	}

	const handleClick = (type) => {
		updateInvoiceStatus({
			payload: {
				id     : invoice?.id,
				status : type,
			},
			message: API_SUCCESS_MESSAGE[type],
		});
	};

	const geo = getGeoConstants();

	const cross_entity_check = 	ALLOWED_ENTITY_ID_FOR_CN.includes(invoice?.entity_id) && invoice?.status === 'approved';

	const showRequestCN = (showCN || cross_entity_check)
	&& !invoice.is_revoked && !RESTRICT_REVOKED_STATUS.includes(invoice.status)
	&& (shipment_data?.serial_id > GLOBAL_CONSTANTS.others.old_shipment_serial_id || isAuthorized)
	&& geo.others.navigations.partner.bookings.invoicing.request_credit_note;

	if (invoice?.parent_invoice_id) {
		return (
			<div className={styles.invoice_container}>
				<div className={styles.invoice_status}>
					{startCase(invoice.status)}
				</div>
				{showRequestCN ? (
					<Button
						style={{ marginTop: '4px' }}
						size="sm"
						onClick={() => setAskNullify(true)}
					>
						Request CN
					</Button>
				) : null}
			</div>
		);
	}

	return (
		<div className={styles.invoice_container}>
			{invoice.status
					&& RESTRICT_REVOKED_STATUS.includes(invoice.status) ? (
						<div className={styles.invoice_status}>
							{startCase(invoice.status)}
						</div>
				) : null}

			{!invoice.is_revoked && invoice.status !== 'finance_rejected' ? (
				<Actions
					invoice={invoice}
					refetch={refetchAferApiCall}
					shipment_data={shipment_data}
					invoiceData={invoiceData}
					isIRNGenerated={isIRNGenerated}
					bfInvoice={bfInvoice}
				/>
			) : null}

			{invoice?.status === 'reviewed'
					&& shipment_data?.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id ? (
						<Button
							style={{ marginTop: '4px' }}
							size="sm"
							onClick={() => handleClick('amendment_requested')}
						>
							Request Amendment
						</Button>
				) : null}

			{showRequestCN ? (
				<Button
					style={{ marginTop: '4px' }}
					size="sm"
					onClick={() => setAskNullify(true)}
				>
					Request CN
				</Button>
			) : null}

			{invoice?.is_revoked && invoice?.status !== 'revoked' ? (
				<div className={styles.info_container}>Requested for Revoke</div>
			) : null}
		</div>
	);
}
export default Status;
