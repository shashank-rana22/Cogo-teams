import { Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useContext, useRef } from 'react';

import styles from '../styles.module.css';

const FIRST_ELEM = 0;

function InvoicingPartyDetail({
	invoice = {},
	invoicesList = [],
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const invoicePartyDetailsRef = useRef(null);

	const {
		live_invoice_number,
		billing_address,
	} = invoice;

	let invoiceStatus = invoicesList?.filter(
		(item) => item?.invoiceNumber === live_invoice_number
			|| item?.proformaNumber === live_invoice_number,
	)?.[FIRST_ELEM]?.status;

	if (invoiceStatus === 'POSTED') {
		invoiceStatus = 'IRN GENERATED';
	}
	return (
		<div className={styles.invoice_party_details} ref={invoicePartyDetailsRef}>
			<div className={styles.invoice_party_name}>
				{billing_address?.name || billing_address?.business_name}
			</div>

			{!GLOBAL_CONSTANTS.features.freight_sales_invoice.restricted_entity_ids.includes(shipment_data?.entity_id)
				? (
					<div className={styles.gst}>
						<div className={styles.label}>GST Number :</div>
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
				) : null}
		</div>
	);
}
export default InvoicingPartyDetail;
