import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function getSecurityDepositData({ advanceSecurityDeposit, t }) {
	const {
		shipmentId = '',
		currency = '',
		amountPerContainer = 0,
		numberOfContainers = 0,
		paymentMode = '',
		remark = '',
		supplierName = '',
		totalAmountToBePaid = 0,
	} = advanceSecurityDeposit || {};
	return (
		[
			{ title: t('incidentManagement:supplier_name_title'), value: supplierName },
			{ title: t('incidentManagement:shipment_id'), value: shipmentId },
			{ title: t('incidentManagement:currency_label'), value: currency },
			{ title: t('incidentManagement:amount_per_container'), value: amountPerContainer },
			{ title: t('incidentManagement:number_of_containers'), value: numberOfContainers },
			{ title: t('incidentManagement:total_amount_to_pay'), value: totalAmountToBePaid },
			{ title: t('incidentManagement:payment_mode'), value: paymentMode },
			{
				title: t('incidentManagement:remark_title'),
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

export default getSecurityDepositData;
