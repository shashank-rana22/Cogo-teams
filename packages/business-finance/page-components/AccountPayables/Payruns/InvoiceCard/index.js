import { Button, Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function InvoiceCard({ setSelectedPayrun = () => {}, itemData = {}, setSelectedIds = () => {}, loading = false }) {
	const { name, invoiceCount, currency, totalValue, createdAt } = itemData;

	return (
		<div className={styles.container}>
			<Button
				disabled={loading}
				onClick={() => {
					setSelectedPayrun(null);
					setSelectedIds([]);
				}}
			>
				Go Back
			</Button>
			<div>
				{loading ? <Placeholder height={12} width={160} /> : name}
			</div>
			<div className={styles.sub_container}>
				Total Value :
				<div className={styles.value}>
					{loading ? <Placeholder height={12} width={60} />
						: formatAmount({
							amount  : totalValue,
							currency,
							options : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
				</div>
			</div>
			<div className={styles.sub_container}>
				No. of Invoices :
				<div className={styles.value}>
					{loading ? <Placeholder height={12} width={24} /> : invoiceCount}
				</div>
			</div>
			<div className={styles.sub_container}>
				<div className={styles.value}>
					{loading ? <Placeholder height={12} width={90} /> : createdAt}
				</div>
			</div>
		</div>
	);
}

export default InvoiceCard;
