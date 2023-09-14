import { cl } from '@cogoport/components';
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

function TimeLineItemCheck({ checkItem = {}, status = '', isTagFound = false, currentTab = '' }) {
	const isInvoiceApproved = status === 'FINANCE_ACCEPTED';
	if (!isTagFound) {
		delete ITEMS.taggingCheck;
	}
	const updatedCurrentTab = currentTab.replace('Tab', 'Check');
	return (
		<div className={styles.timeline}>
			{Object.keys(ITEMS).map((itemKey) => (
				<div
					className={styles.container}
					key={itemKey}
					style={{ width: ITEMS[itemKey] !== 'Line Items' ? '100%' : '50%' }}
				>
					<div
						className={styles.line_group}
					>
						{checkItem[itemKey] || isInvoiceApproved ? (
							<IcMFtick color="#f68b21" height={24} width={24} />
						) : (
							<div
								className={cl`
								${styles.sharedCircle} 
								${itemKey === updatedCurrentTab ? styles.currentTabCircle : styles.dull}`}
							/>
						)}
						{ITEMS[itemKey] !== 'Line Items' ? (
							<div
								className={styles.line}
								style={{
									backgroundColor: (checkItem[itemKey] || isInvoiceApproved)
										? '#f68b21' : '#bdbdbd',
								}}
							/>
						) : undefined}
					</div>
					<div className={itemKey === updatedCurrentTab ? styles.currentTabStyle : undefined}>
						{ITEMS[itemKey]}
					</div>

				</div>
			))}
		</div>
	);
}
export default TimeLineItemCheck;
