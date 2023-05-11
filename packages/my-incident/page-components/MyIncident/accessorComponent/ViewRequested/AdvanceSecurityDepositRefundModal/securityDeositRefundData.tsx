import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function SecurityDepositRefundData({ advanceSecurityDepositRefund }) {
	const {
		supplierName = '',
		totalAmount = 0,
		uploadProof = [],
		utrNumber = '',
		remark = '',
		sid = '',
	} = advanceSecurityDepositRefund || {};
	return (
		[
			{ title: 'Supplier Name', value: supplierName },
			{ title: 'Shipment ID', value: sid },
			{ title: 'Total Amount', value: totalAmount },
			{ title: 'UTR Number', value: utrNumber },
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
			{
				title: 'Upload Proof',
				value:
	<div>

		{(uploadProof || []).map((url:any) => (url !== '' ? (
			<a href={url} target="_blank" rel="noreferrer">
				<div className={styles.view_flex}>
					<div className={styles.view}>link</div>
				</div>
			</a>
		) : (
			<div> No document available</div>
		)))}
	</div>,
			},
		]
	);
}

export default SecurityDepositRefundData;
