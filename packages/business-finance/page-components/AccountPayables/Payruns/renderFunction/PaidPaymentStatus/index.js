import React from 'react';

function PaidPaymentStatus({ itemData }) {
	return (
		<div>
			{itemData?.paymentStatus}
		</div>
	);
}

export default PaidPaymentStatus;
