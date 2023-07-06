import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import useUpdateShipmentInvoiceStatus from '../../../../../../hooks/useUpdateShipmentInvoiceStatus';

import InvoiceDetail from './InvoiceDetail';
import InvoicingPartyDetail from './InvoicingPartyDetail';
import RequestCN from './RequestCN';
import Status from './Status';
import styles from './styles.module.css';

const UPPER_CASE_EXCHANGE_RATE_STATE = ['eta', 'etd'];

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
	const [open, setOpen] = useState(false);
	const [askNullify, setAskNullify] = useState(false);

	const invoicePartyDetailsRef = useRef(null);

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

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.exchange_rate}>
					{invoice?.exchange_rate_source ? (
						<div className={styles.invoice_source}>
							{startCase(invoice?.exchange_rate_source)}
						</div>
					) : null}

					{invoice?.exchange_rate_state ? (
						<div className={styles.invoice_rate}>
							{`Applicable State - ${UPPER_CASE_EXCHANGE_RATE_STATE.includes(invoice?.exchange_rate_state)
								? upperCase(invoice?.exchange_rate_state) : startCase(invoice?.exchange_rate_state)}`}
						</div>
					) : null}
				</div>

				<div className={styles.exchange_rate}>

					{invoice?.source === 'pass_through' ? (
						<div className={styles.invoice_source}>
							Source -
							&nbsp;
							{startCase(invoice?.source)}
						</div>
				 	) : null}
				</div>
			</div>

			<div className={cl`${styles.flex_row} ${open ? styles.open : ''}`}>
				<InvoicingPartyDetail invoice={invoice} invoicesList={invoicesList} />

				<InvoiceDetail
					updateInvoiceStatus={updateInvoiceStatus}
					invoice={invoice}
					invoicesList={invoicesList}
				/>

				<Status
					invoice={invoice}
					invoicesList={invoicesList}
					refetchAferApiCall={refetchAferApiCall}
					invoiceData={invoiceData}
					updateInvoiceStatus={updateInvoiceStatus}
					isIRNGenerated={isIRNGenerated}
					setAskNullify={setAskNullify}
				/>

				<div
					className={styles.icon_wrapper}
					role="button"
					tabIndex={0}
					onClick={() => setOpen(!open)}
					style={{ height: `${invoicePartyDetailsRef.current?.offsetHeight}px` }}
				>
					{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</div>
			</div>

			{open ? <div>{children}</div> : null}

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
