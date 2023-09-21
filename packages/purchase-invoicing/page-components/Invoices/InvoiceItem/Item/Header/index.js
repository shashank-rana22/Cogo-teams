import { cl } from '@cogoport/components';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import InvoiceDetail from './InvoiceDetail';
import InvoicingPartyDetail from './InvoicingPartyDetail';
import Status from './Status';
import styles from './styles.module.css';

const UPPER_CASE_EXCHANGE_RATE_STATE = ['eta', 'etd'];

function Header({
	children = null,
	invoice = {},
	invoicesList = [],
	bfInvoiceRefetch = () => {},
	purchaseInvoicesRefetch = () => {},
}) {
	const [open, setOpen] = useState(false);

	const invoicePartyDetailsRef = useRef(null);

	const refetchAferApiCall = () => {
		bfInvoiceRefetch();
		purchaseInvoicesRefetch();
	};

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
				<InvoicingPartyDetail
					invoice={invoice}
				/>

				<InvoiceDetail
					invoice={invoice}
					invoicesList={invoicesList}
				/>

				<Status
					invoice={invoice}
					refetchAferApiCall={refetchAferApiCall}
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

		</div>
	);
}
export default Header;
