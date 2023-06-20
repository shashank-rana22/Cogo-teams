import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRef } from 'react';

import styles from '../styles.module.css';

function InvoicingPartyDetail({
	invoice = {},
	invoicesList = [],
}) {
	const invoicePartyDetailsRef = useRef(null);

	const {
		live_invoice_number,
		billing_address,
	} = invoice;

	let invoiceStatus = invoicesList?.filter(
		(item) => item?.invoiceNumber === live_invoice_number
			|| item?.proformaNumber === live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index]?.status;

	if (invoiceStatus === 'POSTED') {
		invoiceStatus = 'IRN GENERATED';
	}

	return (
		<div className={styles.invoice_party_details} ref={invoicePartyDetailsRef}>
			<div className={styles.invoice_party_name}>
				{billing_address?.name || billing_address?.business_name}
			</div>

			<div className={styles.gst}>
				<div className={styles.label}>TAX Number :</div>
				<Tooltip
					theme="light"
					placement="bottom"
					content={(
						<div className={styles.tooltip_div}>
							{billing_address?.address}
						</div>
					)}
				>
					<div
						className={styles.gst_number}
					>
						{billing_address?.tax_number}
					</div>
				</Tooltip>
			</div>
		</div>
	);
}
export default InvoicingPartyDetail;
