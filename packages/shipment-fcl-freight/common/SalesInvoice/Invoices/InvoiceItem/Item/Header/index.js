import { cl } from '@cogoport/components';
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
	isCrossEntity = false,
	creditNoteList = [],
}) {
	const [open, setOpen] = useState(false);
	const [askNullify, setAskNullify] = useState(false);

	const invoicePartyDetailsRef = useRef(null);

	const refetchAferApiCall = () => {
		bfInvoiceRefetch();
		salesInvoicesRefetch();
	};

	const { updateInvoiceStatus = () => {} } = useUpdateShipmentInvoiceStatus({ refetch: refetchAferApiCall });

	return (
		<div className={styles.container}>
			<div>
				{invoice?.source === 'pass_through' ? (
					<div className={styles.invoice_source}>
						Source -
						{' '}
						{startCase(invoice?.source)}
					</div>
				) : null}

				{invoice?.exchange_rate_state ? (
					<div className={styles.invoice_source}>
						{`Applicable State - ${UPPER_CASE_EXCHANGE_RATE_STATE.includes(invoice?.exchange_rate_state)
							? upperCase(invoice?.exchange_rate_state) : startCase(invoice?.exchange_rate_state)}`}
					</div>
				) : null}
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
					isCrossEntity={isCrossEntity}
					creditNoteList={creditNoteList}
				/>

				<div
					className={styles.icon_wrapper}
					role="presentation"
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
