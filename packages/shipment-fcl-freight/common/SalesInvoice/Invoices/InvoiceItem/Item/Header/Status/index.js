import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getEntityCode from '@cogoport/globalization/utils/getEntityCode';
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

function Status({
	invoice = {},
	invoiceData = {},
	invoicesList = [],
	refetchAferApiCall = () => {},
	updateInvoiceStatus = () => {},
	isIRNGenerated = false,
	setAskNullify = () => {},
	isCrossEntity = false,
	creditNoteList = [],
}) {
	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));
	const isAuthorized = [GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id,
		GLOBAL_CONSTANTS.uuid.santram_gurjar_user_id].includes(user_data?.user?.id);
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { serial_id = '', is_job_closed = '' } = shipment_data || {};

	const bfInvoice = invoicesList?.filter(
		(item) => item?.proformaNumber === invoice?.live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index];

	const showCN = BF_INVOICE_STATUS.includes(bfInvoice?.status)
	|| (![101, 301, 401, 501].includes(getEntityCode(invoice?.entity_id)) && bfInvoice?.status === 'FINANCE_ACCEPTED');

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

	const isCNApproved = (creditNoteList || []).some((creditNote) => creditNote?.invoice_combination_id === invoice?.id
	&& creditNote?.status === 'approved');

	const showRequestCN = showCN
	&& !invoice.is_revoked && !RESTRICT_REVOKED_STATUS.includes(invoice?.status)
	&& (serial_id > GLOBAL_CONSTANTS.others.old_shipment_serial_id || isAuthorized)
	&& geo.others.navigations.partner.bookings.invoicing.request_credit_note
	&& !invoice?.processing
	&& !isCNApproved;

	if (isCrossEntity) {
		return (
			<div className={styles.invoice_container}>
				<div className={styles.invoice_status}>
					{startCase(invoice?.status || '')}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.invoice_container}>
			{invoice?.status
					&& RESTRICT_REVOKED_STATUS.includes(invoice?.status) ? (
						<>
							<div className={styles.invoice_status}>
								{startCase(invoice.status || '')}
							</div>
							{invoice?.status === 'finance_rejected' && invoice?.rejection_reason
								? (
									<div className={styles.invoice_rejection_reason}>
										{invoice.rejection_reason}
									</div>
								)
								: null}
						</>
				) : null}

			{!invoice?.is_revoked && invoice?.status !== 'finance_rejected' && (
				<Actions
					invoice={invoice}
					refetch={refetchAferApiCall}
					shipment_data={shipment_data}
					invoiceData={invoiceData}
					isIRNGenerated={isIRNGenerated}
					bfInvoice={bfInvoice}
				/>
			)}

			{invoice?.status === 'reviewed'
					&& serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
					&& !invoice?.processing ? (
						<Button
							style={{ marginTop: '4px' }}
							size="sm"
							disabled={is_job_closed}
							onClick={() => handleClick('amendment_requested')}
						>
							Request Amendment
						</Button>
				) : null}

			{showRequestCN ? (
				<Button
					style={{ marginTop: '4px' }}
					size="sm"
					disabled={is_job_closed}
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
