import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function getSecurityDepositRefundData({ advanceSecurityDepositRefund, t }) {
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
			{ title: t('incidentManagement:supplier_name_title'), value:	supplierName },
			{ title: t('incidentManagement:shipment_id'), value:	sid },
			{ title: t('incidentManagement:total_amount'), value:	totalAmount },
			{ title: t('incidentManagement:utr_number'), value:	utrNumber },
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
			{
				title: t('incidentManagement:upload_proof_title'),
				value:
	<div>

		{(uploadProof || []).map((url:any) => (url !== '' ? (
			<a href={url} target="_blank" rel="noreferrer" key={url}>
				<div className={styles.view_flex}>
					{t('incidentManagement:link')}
				</div>
			</a>
		) : (
			<div key={url}>
				{' '}
				{t('incidentManagement:no_doc_available')}
			</div>
		)))}
	</div>,
			},
		]
	);
}

export default getSecurityDepositRefundData;
