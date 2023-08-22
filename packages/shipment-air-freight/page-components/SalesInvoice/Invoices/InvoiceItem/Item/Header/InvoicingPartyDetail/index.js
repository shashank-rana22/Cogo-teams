import { Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import React, { useContext } from 'react';

import styles from '../styles.module.css';

function InvoicingPartyDetail({
	invoice = {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const {
		billing_address,
	} = invoice;

	const RESTRICTED_ENTITY_IDS = [];

	Object.entries(ENTITY_MAPPING).forEach(([, value]) => (
		value?.feature_supported?.includes('freight_sales_invoice_restricted_enitity')
			&& RESTRICTED_ENTITY_IDS.push(value.id)));

	return (
		<div className={styles.invoice_party_details}>
			<div className={styles.invoice_party_name}>
				{billing_address?.name || billing_address?.business_name}
			</div>

			{!RESTRICTED_ENTITY_IDS.includes(shipment_data?.entity_id)
				&& (
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
				)}
		</div>
	);
}
export default InvoicingPartyDetail;
