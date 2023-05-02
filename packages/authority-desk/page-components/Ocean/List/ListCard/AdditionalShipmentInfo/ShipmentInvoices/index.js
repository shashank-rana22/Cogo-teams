import React, { useState } from 'react';

import useListInvoiceWrapper from '../../../../../../hooks/useListInvoiceWrapper';

import InvoiceInfo from './InvoiceInfo';
import styles from './styles.module.css';

function ShipmentInvoices() {
	const { data, loading } = useListInvoiceWrapper();

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.invoice_number}>
					<b>Invoice Number</b>
				</div>
				<div className={styles.invoice_type}><b>Type </b></div>
				<div className={styles.invoice_value}>
					{' '}
					<b>Invoice Value </b>
					{' '}
				</div>
				<div className={styles.balance_amount}>
					{' '}
					<b>  Balance Amount </b>
					{' '}
				</div>
				<div className={styles.due_date}>
					{' '}
					<b>Due Date </b>
					{' '}
				</div>
				<div className={styles.payment_status}>
					{' '}
					<b>Payment Status </b>
					{' '}
				</div>
			</div>

			{(data?.list || []).map((item) => <InvoiceInfo item={item} />)}

		</div>
	);
}

export default ShipmentInvoices;
