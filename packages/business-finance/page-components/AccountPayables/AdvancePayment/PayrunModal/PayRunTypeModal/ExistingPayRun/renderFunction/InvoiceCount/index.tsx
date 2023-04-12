import React from 'react';

function InvoiceCount({ itemData }) {
	return (
		<div>
			No. of invoices :
			{' '}
			{' '}
			{' '}
			{itemData?.count}
		</div>
	);
}

export default InvoiceCount;
