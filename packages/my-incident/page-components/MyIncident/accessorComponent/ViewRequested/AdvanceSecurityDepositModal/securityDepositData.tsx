import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function SecurityDepositData({ advanceSecurityDeposit }) {
	const {
		advanceDocumentId = '',
		amountPerContainer = 0,
		numberOfContainers = 0,
		paymentMode = '',
		remark = '',
		supplierName = '',
		totalAmountToBePaid = 0,
	} = advanceSecurityDeposit || {};
	return (
		[
			{ title: 'Supplier Name', value: supplierName },
			{ title: 'Shipment ID', value: advanceDocumentId },
			{ title: 'Amount Per container', value: amountPerContainer },
			{ title: 'Number of containers', value: numberOfContainers },
			{ title: 'Total Amount to be paid', value: totalAmountToBePaid },
			{ title: 'Payment Mode', value: paymentMode },
			{
				title: 'Remark',
				value:
	<div>
		{remark?.length >= 30 ? (
			<Tooltip
				placement="top"
				content={<div className={styles.tooltip_text}>{remark}</div>}
				interactive
			>
				<div className={styles.remark_overflow}>
					{remark}
					...
				</div>
			</Tooltip>
		) : (
			remark
		)}
	</div>,
			},
		]
	);
}

export default SecurityDepositData;
