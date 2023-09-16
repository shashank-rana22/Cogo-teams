import { Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import React, { useContext, useRef } from 'react';

import styles from '../styles.module.css';

function InvoicingPartyDetail({
	invoice = {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const invoicePartyDetailsRef = useRef(null);

	const {
		buy_address,
	} = invoice;

	const RESTRICTED_ENTITY_IDS = [];

	Object.entries(ENTITY_MAPPING).forEach(([key, value]) => (
		ENTITY_FEATURE_MAPPING[key]?.feature_supported
			?.includes('freight_cross_entity_purchase_invoice_restricted_entity')
			? RESTRICTED_ENTITY_IDS.push(value.id) : null));

	return (
		<div className={styles.invoice_party_details} ref={invoicePartyDetailsRef}>
			<div className={styles.invoice_party_name}>
				{buy_address?.name || buy_address?.business_name}
			</div>

			{!RESTRICTED_ENTITY_IDS.includes(shipment_data?.entity_id)
				? (
					<div className={styles.gst}>
						<div className={styles.label}>GST Number :</div>
						<Tooltip
							theme="light"
							placement="bottom"
							content={(
								<div className={styles.tooltip_div}>
									{buy_address?.address}
								</div>
							)}
						>
							<div
								className={styles.gst_number}
							>
								{buy_address?.tax_number}
							</div>
						</Tooltip>
					</div>
				) : null}
		</div>
	);
}
export default InvoicingPartyDetail;
