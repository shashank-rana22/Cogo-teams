import { upperCase } from '@cogoport/utils';
import React from 'react';

import LineItemTable from '../../common/LineItemTable';
import handlePartyDetails from '../../helpers/handlePartyDetails';

import styles from './styles.module.css';

const DETAILS = [
	{ key: 'bank_name', label: 'Bank Details' },
	{ key: 'bank_account_number', label: 'Account Number' },
	{ key: 'ifsc_number', label: 'IFSC' },
	{ key: 'registration_number', label: 'PAN Number' },
];

function PurchaseLineItemDetails({
	billingPartyObj = {},
	collectionPartyObj = {},
	editData = {},
	purchaseInvoiceValues = {},
}) {
	const { billingPartyDetails, collectionPartyDetails } = handlePartyDetails({
		billingPartyObj,
		collectionPartyObj,
		editData,
		purchaseInvoiceValues,
	});

	return (
		<div>
			<div className={styles.borderbottom}>
				<div className={styles.heading}>
					{upperCase(purchaseInvoiceValues?.invoice_type)
				|| 'PURCHASE INVOICE'}

				</div>
				<div>
					<div className={`${styles.heading} ${styles.margintop} ${styles.marginbottom}`}>Billing Party</div>
					<span className={styles.label}>
						{billingPartyDetails?.entity_code}
						{' '}
						-
						{' '}
						{billingPartyDetails?.business_name}

					</span>
					<div className={styles.flex}>
						<div className={`${styles.margin} ${styles.marginright}`}>
							<span className={styles.label}>PAN Number : </span>
							<span className={styles.value}>
								{billingPartyDetails?.registration_number}
							</span>
						</div>
						<div className={styles.margin}>
							<span className={styles.label}>GST Number : </span>
							<span className={styles.value}>{billingPartyDetails?.gst_number}</span>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.borderbottom} ${styles.marginbottom}`}>
				<div className={`${styles.heading} ${styles.margintop} ${styles.marginbottom}`}>
					Collection Party/Bank Details
				</div>
				<div>
					<span className={`${styles.label} ${styles.margintop}`}>
						{collectionPartyDetails?.company_name || '-'}
					</span>
					<div className={`${styles.flex} ${styles.wrap}`}>
						{DETAILS.map(({ label, key }) => (
							<div className={`${styles.margin} ${styles.marginright}`} key={key}>
								<span className={styles.label}>
									{label}
								</span>
								<span className={styles.value}>
									:
									{' '}
									{collectionPartyDetails?.[key] || '-'}
								</span>
							</div>
						))}
						<div className={styles.margin}>
							<span className={styles.label}>GST Number : </span>
							<span className={styles.value}>{collectionPartyDetails?.tax_number || '-'}</span>
						</div>
						{collectionPartyDetails?.bankStatus === 'pending' ? (
							<div className={styles.pending}>
								Bank Details verification approval pending
							</div>
						) : null}
					</div>
				</div>
			</div>
			<LineItemTable lineItems={purchaseInvoiceValues?.line_items || []} />
		</div>
	);
}

export default PurchaseLineItemDetails;
