import { IcMFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const ITEMS = {
	shipmentDetailsCheck : 'Shipment Details',
	documentsCheck       : 'Documents',
	taggingCheck         : 'Invoice Tagging',
	sidDataCheck         : 'SID Data',
	collectionPartyCheck : 'Collection Party Details',
	billingPartyCheck    : 'Billing Party Details',
	invoiceDetailsCheck  : 'Invoice Details',
	lineItemsCheck       : 'Line Items',
};

function TimeLineItemCheck({ checkItem = {}, status = '' }) {
	const isInvoiceApproved = status === 'FINANCE_ACCEPTED';
	return (
		<div>
			<div className={styles.timeline}>
				{Object.keys(ITEMS).map((itemKey) => (
					<div className={styles.container} key={itemKey}>
						<div>
							{checkItem[itemKey] || isInvoiceApproved ? (
								<IcMFtick color="red" height={30} width={30} />
							) : (
								<div className={styles.dull} />
							)}
							<div className={styles.text_container}>{ITEMS[itemKey]}</div>
						</div>

						{ITEMS[itemKey] !== 'Line Items' ? <div className={styles.line} /> : undefined}
					</div>
				))}
			</div>
		</div>
	);
}
export default TimeLineItemCheck;
