import { Pill } from '@cogoport/components';
import React from 'react';

function PaymentStatus({ itemData = {} }) {
	const paymentStatus = itemData?.paymentStatus;
	return (
		<div>
			<Pill size="md" color={paymentStatus === 'PENDING' ? 'yellow' : 'green'}>
				{paymentStatus}
			</Pill>
		</div>
	);
}

export default PaymentStatus;
