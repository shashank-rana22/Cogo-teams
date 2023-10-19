import React from 'react';

function InvoiceCount({ itemData }) {
	const { invoiceCount } = itemData || {};
	return (
		<div>
			No. of invoices :
			{' '}
			{' '}
			{' '}
			{invoiceCount}
		</div>
	);
}

export default InvoiceCount;
