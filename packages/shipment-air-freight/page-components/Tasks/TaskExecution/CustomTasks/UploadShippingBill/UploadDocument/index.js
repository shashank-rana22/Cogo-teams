import { Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

const FIRST_NEGATIVE_INDEX = -1;
function UploadDocument({ singleItem = {}, invoiceData = [], setInvoiceData = () => {} }) {
	const [shippingBillValue, setShippingBillValue] = useState('');

	useEffect(() => {
		const itemData = JSON.parse(singleItem?.data) || {};
		const id = singleItem?.id;

		if (!isEmpty(shippingBillValue)) {
			const index = (invoiceData || []).findIndex((item) => item.id === id);
			if (index !== FIRST_NEGATIVE_INDEX) {
				setInvoiceData((prev) => {
					const updatedItems = [...prev];
					updatedItems[index] = {
						id,
						data          : [{ ...itemData, shipping_bill_number: shippingBillValue }],
						document_type : 'checklist',
					};
					return [...updatedItems];
				});
			} else {
				setInvoiceData((prev) => [...prev,
					{
						id,
						data          : [{ ...itemData, shipping_bill_number: shippingBillValue }],
						document_type : 'checklist',
					}]);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shippingBillValue]);

	return (
		<Input
			size="sm"
			placeholder="Enter Shipping Bill"
			value={shippingBillValue}
			onChange={(value) => { setShippingBillValue(value); }}
		/>
	);
}

export default UploadDocument;
