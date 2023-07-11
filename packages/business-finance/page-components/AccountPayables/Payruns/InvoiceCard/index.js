import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function InvoiceCard({ setSelectedPayrun = () => {}, itemData = {} }) {
	const { name, invoiceCount, currency, totalValue, createdAt } = itemData;
	return (
		<div className={styles.container}>
			<Button onClick={() => {
				setSelectedPayrun(null);
			}}
			>
				Go Back
			</Button>
			<div>
				{name}
			</div>
			<div>
				Total Value :
				{formatAmount({
					amount  : totalValue,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})}
			</div>
			<div>
				No. of Invoices :
				{invoiceCount}
			</div>
			<div>
				{createdAt}
			</div>
		</div>
	);
}

export default InvoiceCard;
