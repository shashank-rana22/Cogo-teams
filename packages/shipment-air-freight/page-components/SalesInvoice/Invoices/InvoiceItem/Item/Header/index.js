import { cl, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState, useRef, useContext } from 'react';

import useUpdateShipmentInvoiceStatus from '../../../../../../hooks/useUpdateShipmentInvoiceStatus';

import InvoiceDetail from './InvoiceDetail';
import InvoicingPartyDetail from './InvoicingPartyDetail';
import RequestCN from './RequestCN';
import Status from './Status';
import styles from './styles.module.css';

const API_SUCCESS_MESSAGE = {
	reviewed : 'Invoice sent for approval to customer!',
	approved : 'Invoice approved!,',
};

const BF_INVOICE_STATUS = ['POSTED', 'FAILED', 'IRN_GENERATED'];
const RESTRICT_REVOKED_STATUS = ['revoked', 'finance_rejected'];

function Header({
	children = null,
	invoice = {},
	bfInvoiceRefetch = () => {},
	invoiceData = {},
	invoicesList = [],
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	refetchCN = () => {},
}) {
	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));
	const isAuthorized = [GLOBAL_CONSTANTS.uuid.vinod_talapa_user_id,
		GLOBAL_CONSTANTS.uuid.santram_gurjar_user_id].includes(user_data?.user?.id);

	const { shipment_data = {} } = useContext(ShipmentDetailContext);

	const [open, setOpen] = useState(false);
	const [askNullify, setAskNullify] = useState(false);

	const invoicePartyDetailsRef = useRef(null);

	const bfInvoice = invoicesList?.filter(
		(item) => item?.proformaNumber === invoice?.live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index];

	const showCN = BF_INVOICE_STATUS.includes(
		bfInvoice?.status,
	);

	const refetchAferApiCall = () => {
		bfInvoiceRefetch();
		salesInvoicesRefetch();
	};

	const { updateInvoiceStatus = () => {} } = useUpdateShipmentInvoiceStatus({ refetch: refetchAferApiCall });

	let invoiceStatus = invoicesList?.filter(
		(item) => item?.invoiceNumber === invoice?.live_invoice_number
			|| item?.proformaNumber === invoice?.live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index]?.status;

	if (invoiceStatus === 'POSTED') {
		invoiceStatus = 'IRN GENERATED';
	}

	const geo = getGeoConstants();

	const handleClick = (type) => {
		updateInvoiceStatus({
			payload: {
				id     : invoice?.id,
				status : type,
			},
			message: API_SUCCESS_MESSAGE[type],
		});
	};

	const IS_JOB_CLOSED = shipment_data?.is_job_closed;

	const showRequestCN = showCN
	&& !invoice.is_revoked
	&& !RESTRICT_REVOKED_STATUS.includes(invoice.status)
	&& (shipment_data?.serial_id > GLOBAL_CONSTANTS.others.old_shipment_serial_id || isAuthorized)
	&& geo.others.navigations.partner.bookings.invoicing.request_credit_note && !IS_JOB_CLOSED
	&& !invoice?.processing;

	return (
		<div className={styles.container}>
			<div>
				{invoice?.source === 'pass_through' && (
					<div className={styles.invoice_source}>
						Source -
						{' '}
						{startCase(invoice?.source)}
					</div>
				)}

				{invoice?.exchange_rate_state ? (
					<div className={styles.invoice_source}>
						Applicable State -
						{' '}
						{startCase(invoice?.exchange_rate_state)}
					</div>
				) : null}
			</div>

			<div className={cl`${styles.flex_row} ${open ? styles.open : ''}`}>
				<InvoicingPartyDetail invoice={invoice} />

				<InvoiceDetail
					updateInvoiceStatus={updateInvoiceStatus}
					invoice={invoice}
					invoicesList={invoicesList}
				/>

				<div className={styles.amendment_cn_container}>
					{invoice?.status === 'reviewed'
						&& shipment_data?.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
						&& !invoice?.processing ? (
							<Button
								size="sm"
								className={styles.amend_cn_buttons}
								onClick={() => handleClick('amendment_requested')}
								disabled={IS_JOB_CLOSED}
							>
								Request Amendment
							</Button>
						) : null}

					{showRequestCN ? (
						<Button
							size="sm"
							className={styles.amend_cn_buttons}
							onClick={() => setAskNullify(true)}
							disabled={IS_JOB_CLOSED}
						>
							Request CN
						</Button>
					) : null}

					{invoice?.is_revoked && invoice?.status !== 'revoked' && (
						<div className={styles.info_container}>Requested for Revoke</div>
					)}
				</div>

				<Status
					invoice={invoice}
					invoicesList={invoicesList}
					refetchAferApiCall={refetchAferApiCall}
					invoiceData={invoiceData}
					updateInvoiceStatus={updateInvoiceStatus}
					isIRNGenerated={isIRNGenerated}
					setAskNullify={setAskNullify}
					bfInvoice={bfInvoice}
					restrictedRevokedStatus={RESTRICT_REVOKED_STATUS}
				/>

				<Button
					className={styles.icon_wrapper}
					themeType="tertiary"
					onClick={() => setOpen((prev) => !prev)}
					style={{ height: `${invoicePartyDetailsRef.current?.offsetHeight}px` }}
				>
					{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</Button>
			</div>

			{open && <div>{children}</div>}

			<RequestCN
				askNullify={askNullify}
				setAskNullify={setAskNullify}
				invoice={invoice}
				refetchCN={refetchCN}
				invoiceData={invoiceData}
				bfInvoiceRefetch={bfInvoiceRefetch}
			/>
		</div>
	);
}
export default Header;
