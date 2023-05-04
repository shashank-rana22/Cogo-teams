import React from 'react';

import LineItemTable from '../../common/LineItemTable';

import styles from './styles.module.css';

function PurchaseLineItemDetails({ purchaseInvoiceValues = {} }) {
	return (
		<div>
			<div className={styles.borderbottom}>
				<div className={styles.heading}>PURCHASE INVOICE</div>
				<div>
					<div className={`${styles.heading} ${styles.margintop} ${styles.marginbottom}`}>Billing Party</div>
					<span className={styles.label}>301 - COGOPORT PRIVATE LIMITED</span>
					<div className={styles.flex}>
						<div className={`${styles.margin} ${styles.marginright}`}>
							<span className={styles.label}>PAN Number : </span>
							<span className={styles.value}>PAN Number : </span>
						</div>
						<div className={styles.margin}>
							<span className={styles.label}>GST Number : </span>
							<span className={styles.value}>PAN Number : </span>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.borderbottom} ${styles.marginbottom}`}>
				<div className={`${styles.heading} ${styles.margintop} ${styles.marginbottom}`}>
					Collection Party/Bank Details
				</div>
				<div>
					<span className={`${styles.label} ${styles.margintop}`}>OCEAN NETWORK EXPRESS PTE. LTD</span>
					<div className={`${styles.flex} ${styles.wrap}`}>
						<div className={`${styles.margin} ${styles.marginright}`}>
							<span className={styles.label}>Bank Details : </span>
							<span className={styles.value}> Hongkong & Shanghai Banking Corporation</span>
						</div>
						<div className={styles.margin}>
							<span className={styles.label}>Account Number : </span>
							<span className={styles.value}>OCEANNET247993001 </span>
						</div>
						<div className={styles.margin}>
							<span className={styles.label}>IFSC : </span>
							<span className={styles.value}>HSBC0400002</span>
						</div>
						<div className={`${styles.margin} ${styles.marginright}`}>
							<span className={styles.label}>PAN Number : </span>
							<span className={styles.value}>AACCO6217AGST</span>
						</div>
						<div className={styles.margin}>
							<span className={styles.label}>GST Number : </span>
							<span className={styles.value}>07AACCO6217A1ZX</span>
						</div>
					</div>
				</div>
			</div>
			<LineItemTable lineItems={purchaseInvoiceValues.line_items || []} />
		</div>
	);
}

export default PurchaseLineItemDetails;
