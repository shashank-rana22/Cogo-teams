import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

function ViewInvoices({
	itemData, setSelectedPayrun = () => {},
	selectedPayrun,
}) {
	const handleClick = () => {
		if (isEmpty(selectedPayrun)) {
			setSelectedPayrun(itemData);
		} else {
			setSelectedPayrun(null);
		}
	};
	return (
		<div>
			<Button themeType="secondary" onClick={handleClick}>View Invoices</Button>
		</div>
	);
}

export default ViewInvoices;
