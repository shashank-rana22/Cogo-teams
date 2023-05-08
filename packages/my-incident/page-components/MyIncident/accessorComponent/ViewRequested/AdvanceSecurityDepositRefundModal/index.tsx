import { Button, Tooltip } from '@cogoport/components';
import React from 'react';

import AdvanceDepositCommonModal from '../AdvanceDepositCommonModal';

import styles from './styles.module.css';

function AdvanceSecurityDepositRefundModal({
	itemData,
	showModal,
	setShowModal,
}) {
	const { status, data } = itemData || {};
	const { advanceSecurityDepositRefund } = data || {};
	const {
		supplierName = '',
		totalAmount = 0,
		uploadProof = [],
		utrNumber = '',
		remark = '',
		sid = '',
	} = advanceSecurityDepositRefund || {};

	const securityDepositDetails = [
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
	];
	return (
		<div>
			{status === 'REJECTED'
				&& <Button size="sm" themeType="tertiary" onClick={() => { setShowModal(true); }}>View</Button>}
			{status === 'APPROVED'
            && <Button size="md" themeType="secondary" onClick={() => { setShowModal(true); }}>View</Button>}

			{showModal
			&& (
				<AdvanceDepositCommonModal
					securityDepositDetails={securityDepositDetails}
					itemData={itemData}
					showModal={showModal}
					setShowModal={setShowModal}
					type="SecurityDepositRefund"
				/>
			)}
		</div>
	);
}

export default AdvanceSecurityDepositRefundModal;
