import { cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import useUpdateShipmentInvoiceStatus from '../../../../../../hooks/useUpdateShipmentInvoiceStatus';

import InvoiceDetail from './InvoiceDetail';
import InvoicingPartyDetail from './InvoicingPartyDetail';
import RequestCN from './RequestCN';
import Status from './Status';
import styles from './styles.module.css';

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
			<div>
				{invoice?.source === 'pass_through' && (
					<div className={styles.invoice_source}>
						Source -
						{' '}
						{startCase(invoice?.source)}
					</div>
				)}

				{invoice?.exchange_rate_state && (
					<div className={styles.invoice_source}>
						Applicable State -
						{' '}
						{startCase(invoice?.exchange_rate_state)}
					</div>
				)}
			</div>

			<div className={cl`${styles.flex_row} ${open ? styles.open : ''}`}>
				<InvoicingPartyDetail invoice={invoice} />

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
