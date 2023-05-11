import React from 'react';

import LineItemTable from '../../common/LineItemTable';
import handlePartyDetails from '../../helpers/handlePartyDetails';

import styles from './styles.module.css';

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
				<div className={styles.heading}>PURCHASE INVOICE</div>
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
						<div className={`${styles.margin} ${styles.marginright}`}>
							<span className={styles.label}>Bank Details : </span>
							<span className={styles.value}>
								{' '}
								{collectionPartyDetails?.bank_name || '-'}
							</span>
						</div>
						<div className={`${styles.margin} ${styles.marginright}`}>
							<span className={styles.label}>Account Number : </span>
							<span className={styles.value}>{collectionPartyDetails?.bank_account_number || '-'}</span>
						</div>
						<div className={`${styles.margin} ${styles.marginright}`}>
							<span className={styles.label}>IFSC : </span>
							<span className={styles.value}>{collectionPartyDetails?.ifsc_number || '-'}</span>
						</div>
						<div className={`${styles.margin} ${styles.marginright}`}>
							<span className={styles.label}>PAN Number : </span>
							<span className={styles.value}>{collectionPartyDetails?.registration_number || '-'}</span>
						</div>
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
