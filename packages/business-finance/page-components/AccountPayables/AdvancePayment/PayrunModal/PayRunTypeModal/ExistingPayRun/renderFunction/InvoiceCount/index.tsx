import React from 'react';

interface ItemTypes {
	invoiceCount:number,
}
interface PropsType {
	itemData:ItemTypes,
}

function InvoiceCount({ itemData }:PropsType) {
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
