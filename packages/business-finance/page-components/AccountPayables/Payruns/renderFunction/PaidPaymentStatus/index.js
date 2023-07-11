import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const COLOR_MAPPING = {
	FULL     : '#CDF7D4',
	PARTIAL  : '#FBE39F',
	OVERPAID : '#D9EAFD',
};

function PaidPaymentStatus({ itemData }) {
	const {
		paymentStatus,
		extraPayment,
		billCurrency,
	} = itemData || {};

	return (
		<div>
			{paymentStatus === 'OVERPAID' ? (
				<Tooltip
					content={`Extra Payment:- ${extraPayment} ${billCurrency}`}
					placement="top"
					theme="light"
				>
					<div style={{ width: '100px' }}>
						<div style={{ background: COLOR_MAPPING[paymentStatus] }}>
							{paymentStatus}
						</div>
					</div>
				</Tooltip>
			) : (
				<div className={styles.container} style={{ background: COLOR_MAPPING[paymentStatus] }}>
					{paymentStatus === 'FULL' ? 'Paid' : paymentStatus}
				</div>
			)}
		</div>
	);
}

export default PaidPaymentStatus;
