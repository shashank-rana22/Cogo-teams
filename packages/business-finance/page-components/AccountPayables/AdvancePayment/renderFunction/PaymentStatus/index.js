import { Pill } from '@cogoport/components';
import React from 'react';

function PaymentStatus({ itemData = {} }) {
	const paymentStatus = itemData?.paymentStatus;
	return (
		<div>
			{paymentStatus === 'PENDING' ? <Pill size="md" color="yellow">{paymentStatus}</Pill>
				: <Pill size="sm" color="green">{paymentStatus}</Pill>}
		</div>
	);
}

export default PaymentStatus;
